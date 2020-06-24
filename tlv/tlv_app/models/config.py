from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django_mysql.models import JSONField, Model
from django.contrib.auth.models import User


class Config(Model):
    """
    This class has a user config model.
    """

    name = models.CharField(max_length=30)
    heading = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    filters = JSONField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        """Meta class for config model"""
        model = Config
        unique_together = ('name', 'user')
    def save(self, *args, **kwargs):
        super(Config, self).save(*args, **kwargs)

