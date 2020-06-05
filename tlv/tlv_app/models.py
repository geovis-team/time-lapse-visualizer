from django.db import models
from django.contrib.postgres.fields import JSONField

class Project(models.Model):
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
