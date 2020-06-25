from django.test import TestCase, Client
import json
from django.apps import apps
from django.db.models import Min, Max
from tlv_app.constants import FILTERS, APP_NAME, Time, CLASSES


PRIMARY = "primaryFilters"
SECONDARY = "secondaryFilters"
EARLIEST_TIME = "earliestTime"
LATEST_TIME = "latestTime"


class GetFiltersDefaultTestCase(TestCase):
    """
    This class tests /visualization/get_filters API.
    """

    def setUp(self) -> None:
        self.client = Client()

    """
    These set of functions test for default visualizations
    """

    def test_get_filters_api_with_model_and_isDefault(self):

        for i in range(len(CLASSES)):

            response = self.client.get(
                "/api/visualization/get_filters/",
                {"isDefault": "true", "model": CLASSES[i]},
            )

            # Get latest and earliest time stamps
            model = apps.get_model(app_label=APP_NAME, model_name="Covid")
            mdate = model.objects.aggregate(
                earliestTime=Min(Time), latestTime=Max(Time)
            )

            self.assertEqual(response.status_code, 200)

            self.assertEqual(response.json()[PRIMARY], FILTERS[i][PRIMARY])
            self.assertEqual(response.json()[SECONDARY], FILTERS[i][SECONDARY])
            self.assertEqual(response.json()[EARLIEST_TIME], mdate[EARLIEST_TIME])
            self.assertEqual(response.json()[LATEST_TIME], mdate[LATEST_TIME])

    def test_get_filters_api_with_model_without_isDefault(self):

        for i in range(len(CLASSES)):
            response = self.client.get(
                "/api/visualization/get_filters/", {"model": CLASSES[i]}
            )
            self.assertEqual(response.status_code, 400)

    def test_get_filters_api_without_model_with_isDefault(self):

        response = self.client.get(
            "/api/visualization/get_filters/", {"isDefault": "true"}
        )
        self.assertEqual(response.status_code, 400)

    def test_get_filters_api_without_model_without_isDefault(self):

        response = self.client.get("/api/visualization/get_filters/")
        self.assertEqual(response.status_code, 400)

    def test_isDefault(self):

        for i in range(len(CLASSES)):
            response = self.client.get(
                "/api/visualization/get_filters/",
                {"model": CLASSES[i], "isDefault": "dummy"},
            )
            self.assertEqual(response.status_code, 400)

    def test_model_name(self):

        response = self.client.get(
            "/api/visualization/get_filters/",
            {"isDefault": "true", "model": "dummy"},
        )
        self.assertEqual(response.status_code, 404)

