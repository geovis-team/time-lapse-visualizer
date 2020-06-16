from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_404_NOT_FOUND
from rest_framework.decorators import api_view
from django.apps import apps

from .constants import CLASSES, FILTERS, SECONDARY_FILTERS, APP_NAME, PRIMARY_FILTERS

from django_mysql.models import GroupConcat

from django.db.models import Q, Value as V, Min, Max
from django.db.models.functions import Concat


@api_view(['GET'])
def get_filters(request, *args, **kwargs):
    """
    This method returns the primary and secondary filters of
    the specific model.
    :param request: get request containing model name in params
    :return: filters
    """
    model = request.GET.get('model', None)
    if model is None:
        return Response(
            status=HTTP_400_BAD_REQUEST,
            data="Model name not given in params"
        )
    num_models = 3
    for i in range(num_models):
        if model == CLASSES[i]:
            filters = FILTERS[i]
            break
    if filters is None:
        return Response(
            status=HTTP_404_NOT_FOUND,
            data="Model with the given name not found"
        )
    return Response(
        status=HTTP_200_OK,
        data=filters
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
    conditions = Q()
    for filter in filters:
        conditions = conditions | Q(category=filter)
    
    data = model.objects.filter(conditions)
        
    mdate = data.aggregate(earliestTime = Min('time'), latestTime = Max('time'))
    
    data = list(data.annotate(
            concatenated_filters=Concat( V('"'),'category',V('":'),'entity')
            ).values(
                "latitude","longitude","time"
                ).annotate(
                    filter= GroupConcat('concatenated_filters')
                    ))

    for item in data:
        for k in item:
            if k == "filter":
                item[k] = eval("{"+item[k]+"}")
            else:
                item[k] = str(item[k])

    for k in mdate:
        mdate[k] = str(mdate[k])

    return Response(
        status=HTTP_200_OK,
        data={"primaryFilters": filters, **mdate, "data": data}
    )


# data : [
#     {
#         "lat" : lat,
#         "long": lng,
#         "time": time,
#         "filters" : {
#             "Pfilter1" : {
#                 "x" : 12,
#                 "y" : 13
#             },
#             "Pfilter2" : {
#                 "a" : 15,
#                 "b" : 6
#             }
#         }
#     },
#     {

#     }
# ]