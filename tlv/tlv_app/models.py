from django.db import models
from django_mysql.models import JSONField, Model


class Project(Model):
    """
    This class has a dummy Project model.
    """
    latitude = models.DecimalField(
        max_digits=5,
        decimal_places=2,
    )
    longitude = models.DecimalField(
        max_digits=6,
        decimal_places=2,
    )
    time = models.DateField()
    shop = JSONField(
        null=True
    )
    hospital = JSONField(
        null=True
    )
    transport_station = JSONField(
        null=True
    )
