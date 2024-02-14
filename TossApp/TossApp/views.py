# Django views.py
from rest_framework import generics
from .models import SidebarMenu
from .serializers import SidebarMenuSerializer

class SidebarMenuListAPIView(generics.ListAPIView):
    queryset = SidebarMenu.objects.all()
    serializer_class = SidebarMenuSerializer
