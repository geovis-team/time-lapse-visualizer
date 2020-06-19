from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Covid, Disasters, Shops
import random
import urllib, json


class CovidTestCase(TestCase):
    """
    This class tests the Disasters model.
    """

    def setUp(self) -> None:
        # url corresponds to where the json data is hosted
        url = "http://127.0.0.1:8000/covid.json"
        response = urllib.request.urlopen(url)
        covid_json = json.loads(response.read())
        for covid in covid_json:
            Covid.objects.create(
                latitude=covid['lat'],
                longitude=covid['lng'],
                time=covid['time'].split(' ')[0],
                category=covid['type'],
                entity=covid['filter'],
            )

    def test_cases_added(self):
        """Check if all the entries were added as required"""
        url = "http://127.0.0.1:8000/covid.json"
        response = urllib.request.urlopen(url)
        covid_json = json.loads(response.read())
        json_entries = len(covid_json)
        assert json_entries == Covid.objects.all().count()

    def test_latitude_validation(self):
        """Check if it throws error for invalid latitude"""
        covid = {
            "lat": -116.582711,
            "lng": 110.6786933,
            "time": "2020-05-01 06:34:37",
            "type": "Severe",
            "filter": {
                "recovered": 39,
                "dead": 146
            }
        }
        Covid.objects.create(
            latitude=covid['lat'],
            longitude=covid['lng'],
            time=covid['time'].split(' ')[0],
            category=covid['type'],
            entity=covid['filter'],
        )
        self.assertRaises(ValidationError)
        covid = {
            "lat": 116.582711,
            "lng": 110.6786933,
            "time": "2020-05-01 06:34:37",
            "type": "Severe",
            "filter": {
                "recovered": 39,
                "dead": 146
            }
        }
        Covid.objects.create(
            latitude=covid['lat'],
            longitude=covid['lng'],
            time=covid['time'].split(' ')[0],
            category=covid['type'],
            entity=covid['filter'],
        )
        self.assertRaises(ValidationError)
