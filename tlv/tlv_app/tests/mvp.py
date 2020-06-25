from django.test import TestCase
from django.core.exceptions import ValidationError
import urllib, json, random

from tlv_app.models import Covid


class CovidTestCase(TestCase):
    """
    This class tests the Disasters model.
    """

    def setUp(self) -> None:
        file_path = "tlv_app/data/covid.json"
        with open(file_path, 'r') as f:
            covid_json = json.load(f)
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
        file_path = "tlv_app/data/covid.json"
        with open(file_path, 'r') as f:
            covid_json = json.load(f)
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
