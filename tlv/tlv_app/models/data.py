from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django_mysql.models import JSONField, Model
from .config import Config


class Data(Model):
    """
    This model contains data entries provided by the users
    """
    name = models.ForeignKey(Config, on_delete=models.CASCADE)
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        validators=[MinValueValidator(-90), MaxValueValidator(90)]
    )
    longitude = models.DecimalField(
        max_digits=10,
        decimal_places=6,
        validators=[MinValueValidator(-180), MaxValueValidator(180)]
    )
    time = models.DateField()
    category = models.CharField(
        max_length=20,
    )
    entity = JSONField()
