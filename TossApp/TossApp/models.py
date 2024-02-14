from django.db import models
from django.db.models import JSONField


class SidebarMenu(models.Model):
    code_name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    order_number = models.IntegerField()
    parent_id = models.IntegerField(null=True, blank=True)
    target = models.CharField(max_length=255, blank=True, null=True)
    tenant_id = models.IntegerField()


class ContainerMetadata(models.Model):
    code_name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=50, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    children = JSONField(blank=True, null=True)
    tenant_id = models.IntegerField()


class TableMetadata(models.Model):
    code_name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=50, blank=True, null=True)
    source = models.CharField(max_length=255, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    columns = JSONField(blank=True, null=True)
    tenant_id = models.IntegerField()


class FormMetadata(models.Model):
    code_name = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True, null=True)
    steps = JSONField(blank=True, null=True)
    initial_step = models.CharField(max_length=50, blank=True, null=True)
    actions = JSONField(blank=True, null=True)
    feedback = JSONField(blank=True, null=True)
    masked_parameter = JSONField(blank=True, null=True)
    tenant_id = models.IntegerField(null=True, blank=True)