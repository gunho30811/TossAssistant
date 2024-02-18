# Django views.py
from rest_framework import generics
from .models import SidebarMenu, ContainerMetadata
from .serializers import SidebarMenuSerializer, ContainerMetadataSerializer

# 기존의 SidebarMenuListAPIView
class SidebarMenuListAPIView(generics.ListAPIView):
    queryset = SidebarMenu.objects.all()
    serializer_class = SidebarMenuSerializer

# 추가할 ContainerMetadataListAPIView
class ContainerMetadataListAPIView(generics.ListAPIView):
    queryset = ContainerMetadata.objects.all()
    serializer_class = ContainerMetadataSerializer

