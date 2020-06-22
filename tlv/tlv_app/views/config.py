import json
from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from django.contrib.auth.models import User

from tlv_app.serializers import ConfigSerializer
from tlv_app.models import Config, Data
from tlv_app.permissions import IsOwner
from tlv_app.utils import convert_schema


class ConfigViewSet(viewsets.ModelViewSet):
    queryset = Config.objects.all()
    serializer_class = ConfigSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def create(self, request, *args, **kwargs):
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
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        queryset = Config.objects.filter(user=user)
        return queryset
