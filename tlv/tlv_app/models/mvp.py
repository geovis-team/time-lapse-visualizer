from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django_mysql.models import JSONField, Model
from tlv_app.validators import validateJSON
from tlv_app.constants import PRIMARY_FILTERS as PF


class Covid(Model):
    """
    This class has a dummy Project model.
    """
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
        choices=[(c, c) for c in PF[0]]
    )
    entity = JSONField()

    def clean(self):
        validateJSON(self, 0)


class Disasters(Model):
    """
    This class has a dummy Project model.
    """
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
        choices=[(c, c) for c in PF[1]]
    )
    entity = JSONField()

    def clean(self):
        validateJSON(self, 1)


class Shops(Model):
    """
    This class has a dummy Project model.
    """
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
        choices=[(c, c) for c in PF[2]]
    )
    entity = JSONField()

    def clean(self):
        validateJSON(self, 2)
