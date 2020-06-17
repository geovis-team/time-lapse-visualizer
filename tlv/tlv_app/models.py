from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django_mysql.models import JSONField, Model
from .constants import PRIMARY_FILTERS as PF, SECONDARY_FILTERS as SF
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

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
        choices=[(c,c) for c in PF[0]]
    )
    entity = JSONField()

    def clean(self):
        if not all(x in SF[0][self.category] for x in self.entity.keys()):
            l = []
            raise ValidationError({'entity': _('Incorrect subfilter for selected Category:')})
        try:
            for k in self.entity.keys():
                if self.entity[k] <= 0:
                    raise ValidationError({'entity': _('Subfilter value must be greater than 0')})
        except TypeError as e:
            raise ValidationError({'entity': _('Wrong subfilter value; Only integer values accepted')})


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
        choices=[(c,c) for c in PF[1]]
    )
    entity = JSONField()


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
        choices=[(c,c) for c in PF[2]]
    )
    entity = JSONField()

