# Django serializers.py
from rest_framework import serializers
from .models import SidebarMenu

class SidebarMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = SidebarMenu
        fields = '__all__'
