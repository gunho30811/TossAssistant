# Django serializers.py
from rest_framework import serializers
from .models import SidebarMenu, ContainerMetadata, TableMetadata

class SidebarMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = SidebarMenu
        fields = '__all__'

class ContainerMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContainerMetadata
        fields = '__all__'

class TableMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableMetadata
        fields = '__all__'