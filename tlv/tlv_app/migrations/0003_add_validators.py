# Generated by Django 3.0.7 on 2020-06-11 08:13

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tlv_app', '0002_default_models'),
    ]

    operations = [
        migrations.AlterField(
            model_name='covid',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, validators=[django.core.validators.MinValueValidator(-90), django.core.validators.MaxValueValidator(90)]),
        ),
        migrations.AlterField(
            model_name='covid',
            name='longitude',
            field=models.DecimalField(decimal_places=6, max_digits=10, validators=[django.core.validators.MinValueValidator(-180), django.core.validators.MaxValueValidator(180)]),
        ),
        migrations.AlterField(
            model_name='disasters',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, validators=[django.core.validators.MinValueValidator(-90), django.core.validators.MaxValueValidator(90)]),
        ),
        migrations.AlterField(
            model_name='disasters',
            name='longitude',
            field=models.DecimalField(decimal_places=6, max_digits=10, validators=[django.core.validators.MinValueValidator(-180), django.core.validators.MaxValueValidator(180)]),
        ),
        migrations.AlterField(
            model_name='shops',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=9, validators=[django.core.validators.MinValueValidator(-90), django.core.validators.MaxValueValidator(90)]),
        ),
        migrations.AlterField(
            model_name='shops',
            name='longitude',
            field=models.DecimalField(decimal_places=6, max_digits=10, validators=[django.core.validators.MinValueValidator(-180), django.core.validators.MaxValueValidator(180)]),
        ),
    ]