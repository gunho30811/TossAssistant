"""
URL configuration for TossApp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from .views import SidebarMenuListAPIView, ContainerMetadataListAPIView, TableMetadataListAPIView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sidebar-menu/', SidebarMenuListAPIView.as_view(), name='sidebar-menu'),
    path('api/container-metadata/', ContainerMetadataListAPIView.as_view(), name='container-metadata'),
    path('api/table-metadata/<str:code_name>/', TableMetadataListAPIView.as_view(), name='table_metadata'),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
