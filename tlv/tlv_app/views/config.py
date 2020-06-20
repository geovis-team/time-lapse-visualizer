from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from tlv_app.models import Config
from django.contrib.auth.models import User
from tlv_app.serializers import ConfigSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from rest_framework import permissions
from tlv_app.permissions import IsOwner
from rest_framework.reverse import reverse
from rest_framework.decorators import action
from rest_framework import viewsets
from django.contrib.auth.models import User


class ConfigViewSet(viewsets.ModelViewSet):

  queryset = Config.objects.all()
  serializer_class = ConfigSerializer
  permission_classes = [permissions.IsAuthenticated,IsOwner]

  def perform_create(self, serializer):
    name = self.request.user.username+"_"+self.request.data['name']
    serializer.save(user=self.request.user, name=name)
  
  def get_queryset(self):
    user = self.request.user
    queryset = Config.objects.filter(user=user)
    return queryset
    
