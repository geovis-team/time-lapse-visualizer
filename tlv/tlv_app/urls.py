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
from . import views
from django.urls import path, re_path

app_name = "api"

urlpatterns = [
    path('visualization/<slug:model>/',views.filter),
    path('visualization/<slug:model>/<str:filterString>/',views.filter_data),
    # path('visualization/<slug:model>/<slug:filters>/',views.FilterView.as_view()),
    # re_path(r'visualization/$',views.filter),
    # re_path(r'visualization/$/$',views.FilterView.as_view()),
    # path('', views.FilterData.as_view(), name='filter-data'),
]
