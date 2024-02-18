# Django serializers.py
from rest_framework import serializers
from .models import SidebarMenu, ContainerMetadata

class SidebarMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = SidebarMenu
        fields = '__all__'

class ContainerMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContainerMetadata
        fields = '__all__'