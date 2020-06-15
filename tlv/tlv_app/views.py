from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_404_NOT_FOUND
from rest_framework.decorators import api_view
from django.apps import apps

from .serializers import FilterDataSerializer
from .constants import CLASSES, FILTERS, SECONDARY_FILTERS, APP_NAME


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
    if model == CLASSES[0]:
        filters = FILTERS[0]
    elif model == CLASSES[1]:
        filters = FILTERS[1]
    elif model == CLASSES[2]:
        filters = FILTERS[2]
    else:
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
    filters = request.GET.getlist('filters')
    data = {}
    if model_name == CLASSES[0]:
        subtypes = SECONDARY_FILTERS[0]
    elif model_name == CLASSES[1]:
        subtypes = SECONDARY_FILTERS[1]
    elif model_name == CLASSES[2]:
        subtypes = SECONDARY_FILTERS[2]
    else:
        return Response(
            status=HTTP_404_NOT_FOUND,
            data="Model with given name does not exist"
        )
    if not all(x in subtypes.keys() for x in filters):
        return Response(
            status=HTTP_400_BAD_REQUEST,
            data="Filters specified do not exist for the given model"
        )

    model = apps.get_model(app_label=APP_NAME, model_name=model_name)
    for filter in filters:
        data[filter] = {}
        for subtype in subtypes[filter]:
            q = model.objects.filter(category=filter).filter(entity__has_key=subtype).values("latitude", "longitude",
                                                                                             "time")
            serializer = FilterDataSerializer(q, many=True)
            data[filter][subtype] = serializer.data
    return Response(
        status=HTTP_200_OK,
        data={"primaryFilters": filters, "data": data}
    )
