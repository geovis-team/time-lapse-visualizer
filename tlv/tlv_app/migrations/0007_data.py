# Generated by Django 2.2 on 2020-06-22 19:39

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django_mysql.models


class Migration(migrations.Migration):

    dependencies = [
        ('tlv_app', '0006_rename_config_field'),
    ]

    operations = [
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9, validators=[django.core.validators.MinValueValidator(-90), django.core.validators.MaxValueValidator(90)])),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=10, validators=[django.core.validators.MinValueValidator(-180), django.core.validators.MaxValueValidator(180)])),
                ('time', models.DateField()),
                ('category', models.CharField(max_length=20)),
                ('entity', django_mysql.models.JSONField(default=dict)),
                ('name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tlv_app.Config')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
