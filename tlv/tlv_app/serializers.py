from rest_framework import serializers
from django.core.validators import MinValueValidator, MaxValueValidator


class FilterDataSerializer(serializers.Serializer):
  latitude = serializers.DecimalField(
        max_digits=9,
        decimal_places=6,
        validators=[MinValueValidator(-90), MaxValueValidator(90)]
    )
  longitude = serializers.DecimalField(
        max_digits=10,
        decimal_places=6,
        validators=[MinValueValidator(-180), MaxValueValidator(180)]
    )
  time = serializers.DateField()