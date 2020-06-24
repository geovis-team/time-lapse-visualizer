from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from tlv_app.models import Config
from tlv_app.permissions import IsOwner
from tlv_app.utils import convert_schema


@permission_classes([IsAuthenticated, IsOwner])
@api_view(['POST'])
def add_data(request, *args, **kwargs):
    """
    This method provides functionality for a user to add
    further data to the project. The method validates the data sent
    and utilises convert_schema method for data conversion
    :param request: request contains project_name, file, type_of_db
    :return: appropriate response
    """
    msg = ''
    project_name = request.data.get('name', None)
    if project_name is None:
        msg += "Project name not provided"
    file = request.data.get('file', None)
    if file is None:
        msg += "File not received"
    type_of_db = request.data.get('type', None)
    if type_of_db is None:
        msg += "Type of data not mentioned"
    if len(msg) != 0:
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data=msg
        )
    config = Config.objects.get(user=request.user, name=project_name)
    convert_schema(config, file, type_of_db)
    return Response(
        status=status.HTTP_200_OK,
        data="Data successfully uploaded"
    )
