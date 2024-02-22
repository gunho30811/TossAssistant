# Django views.py
from rest_framework import generics
from .models import SidebarMenu, ContainerMetadata, TableMetadata
from .serializers import SidebarMenuSerializer, ContainerMetadataSerializer, TableMetadataSerializer
from rest_framework.exceptions import NotFound

# 기존의 SidebarMenuListAPIView
class SidebarMenuListAPIView(generics.ListAPIView):
    queryset = SidebarMenu.objects.all()
    serializer_class = SidebarMenuSerializer

# 추가할 ContainerMetadataListAPIView
class ContainerMetadataListAPIView(generics.ListAPIView):
    queryset = ContainerMetadata.objects.all()
    serializer_class = ContainerMetadataSerializer

class TableMetadataListAPIView(generics.ListAPIView):
    serializer_class = TableMetadataSerializer

    def get_queryset(self):
        code_name = self.kwargs.get('code_name')
        return TableMetadata.objects.filter(code_name=code_name)