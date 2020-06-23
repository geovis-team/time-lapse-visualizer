from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_404_NOT_FOUND
from rest_framework.decorators import api_view
from django.apps import apps
from django_mysql.models import GroupConcat
from django.db.models import Q, Value as V, Min, Max, F
from django.db.models.functions import Concat, TruncMonth
import json

from tlv_app.constants import CLASSES, FILTERS, SECONDARY_FILTERS, APP_NAME, PRIMARY_FILTERS, Lat, Lng, Time, Category, Entity
from tlv_app.utils import multidict, aggregator

@api_view(['GET'])
def get_filters(request, *args, **kwargs):
    """
    This method returns the primary and secondary filters of
    the specific model.
    :param request: get request containing model name in params
    :return: filters
    """
    model_name = request.GET.get('model', None)
    if model_name is None:
        return Response(
            status=HTTP_400_BAD_REQUEST,
            data="Model name not given in params"
        )
    num_models = 3
    filters = None
    for i in range(num_models):
        if model_name == CLASSES[i]:
            filters = FILTERS[i]
            break
    if filters is None:
        return Response(
            status=HTTP_404_NOT_FOUND,
            data="Model with the given name not found"
        )
    model = apps.get_model(app_label=APP_NAME, model_name=model_name)
    mdate = model.objects.aggregate(earliestTime = Min(Time), latestTime = Max(Time))
    return Response(
        status=HTTP_200_OK,
        data={**filters,**mdate}
    )


@api_view(['GET'])
def filter_data(request, *args, **kwargs):
    """
    This function filters the data according to the given
    get parameters.
    :param request: contains model name and filters
    :return: filtered data in appropriate format
    """
    model_name = request.GET.get('model', None)
    if model_name is None:
        return Response(
            status=HTTP_400_BAD_REQUEST,
            data="Model name not passed in params"
        )
    data = {}
    num_models = 3
    for i in range(num_models):
        if model_name == CLASSES[i]:
            subtypes = SECONDARY_FILTERS[i]
            default_filter = PRIMARY_FILTERS[i][0]
            break

    if subtypes is None:
        return Response(
            status=HTTP_404_NOT_FOUND,
            data="Model with given name does not exist"
        )
    filters = request.GET.getlist('filters', [default_filter])
    if not all(x in subtypes.keys() for x in filters):
        return Response(
            status=HTTP_400_BAD_REQUEST,
            data="Filters specified do not exist for the given model"
        )

    model = apps.get_model(app_label=APP_NAME, model_name=model_name)

    # Aggregate conditions with "OR" operations
    conditions = Q()
    for filter in filters:
        conditions = conditions | Q(category=filter)
    
    # Apply conditions to filter
    data = model.objects.filter(conditions)

    # Get Earliest and Latest timestamp in dataset (to be used as range for slider)   
    mdate = data.aggregate(earliestTime = Min(Time), latestTime = Max(Time))

    # list(): Converts queryset of dictionaries into list of dictionaries
    # annotate(): Creates an attribute for each object based on existing attributes (Here, attributes 
    # created are "date" and "concatenated_filters")
    # values().annotate(): Groups objects by attributes inside values() (Here: Lat, Lng, 'date'),
    # annotates each of these groups, and returns a Queryset of dictionaries
    data = list(data.annotate(
            date = TruncMonth(Time)    # Truncates value of dateField() to Month level
            ).annotate(
                concatenated_filters = Concat( V('"'),Category,V('":'),Entity)
                ).values(
                    Lat,Lng,'date'
                    ).annotate(
                        filter = Concat( V('{'),GroupConcat('concatenated_filters'), V('}'))
                        ))

    # Traverses through list of dictionaries and fixes the datatype of values in each dictionary
    for item in data:
        for key in item:
            if key == "date":
                # Changes key name 'date' to Time(='time')
                item[Time] = item['date']
                item.pop('date')
                key = Time
            if key == "filter":
                # Converts a string in JSON format to JSON/python dictionary after aggregating 
                # values of duplicate keys
                item[key] = json.loads(item[key], object_pairs_hook=multidict)
                for k,v in item[key].items():
                    item[key][k] = aggregator(v)
            else:
                # Converts values in different data types (Latitude and Longitude in Decimal() 
                # type, time in datetime.date() type) into String type
                item[key] = str(item[key]) 

    return Response(
        status=HTTP_200_OK,
        data={"primaryFilters": filters, **mdate, "data": data}
    )
