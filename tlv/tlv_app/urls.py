"""tlv URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from .views import get_filters, filter_data, register, current_user, revoke_token, ConfigViewSet
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .configUrls import config_list, config_detail
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'config', ConfigViewSet)

app_name = "api"

urlpatterns = [
    path('visualization/get_filters/', get_filters, name="get filters"),
    path('visualization/filter_data/', filter_data, name="filter data"),
    path('register/', register, name="register"),
    path('current_user/', current_user, name="current user"),
    path('revoke_token/', revoke_token, name="revoke token"),
    # path('config_list/', config_list, name="config list")
    # path('config/', config_list, name="config-list"),
    # path('config/<int:pk>', config_detail, name="config-detail"),
    path('', include(router.urls)),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
