from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from tlv_app.serializers import ConfigSerializer
from tlv_app.models import Config, Data
from tlv_app.permissions import IsOwner
from tlv_app.utils import convert_schema


class ConfigViewSet(viewsets.ModelViewSet):
    """
    This viewset defines CRUD operations for config
    model that corresponds to user project.
    """
    queryset = Config.objects.all()
    serializer_class = ConfigSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def create(self, request, *args, **kwargs):
        """
        This method overrides the create method of the ModelViewSet
        and utilises the convert_schema method to upload data
        corresponding to the project when being created.
        :param request: request contains data file and data format type other
        than the fields for config.
        :return: appropriate response code and corresponding data
        """
        msg = ''
        try:
            file = self.request.FILES['file']
        except KeyError:
            msg = "File not received"
        try:
            type = self.request.data["type"]
        except KeyError:
            msg = "Type of data not mentioned"
        if msg != '':
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data=msg
            )
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        name = self.request.data['name']
        instance = Config.objects.get(user=self.request.user, name=name)
        convert_schema(instance, file, type)
        return Response(
            data="The data was uploaded successfully",
            status=status.HTTP_201_CREATED
        )

    def perform_create(self, serializer):
        """
        This method overrides the perform_create method of ModelViewSet
        to add the project owner as the authorised user.
        :param serializer:
        :return:
        """
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """
        This method overrides the get_queryset method of ModelViewSet
        to return only user owned projects rather than all projects.
        :return: Serialised queryset of configs i.e. projects.
        """
        user = self.request.user
        queryset = Config.objects.filter(user=user)
        return queryset
