from django.test import TestCase, Client
import json
from django.db.models import Min, Max
from django.contrib.auth.models import User

from tlv_app.models import Config, Data
from tlv_app.constants import Time

PRIMARY = "primaryFilters"
SECONDARY = "secondaryFilters"
EARLIEST_TIME = "earliestTime"
LATEST_TIME = "latestTime"

PROJECT = {
    "name": "Project",
    "heading": "A Personal Project",
    "description": "This project was created to test the APIs",
    "filters": '{"primary1" : ["secondary11", "secondary12"],"primary2" : ["secondary21", "secondary22"],"primary3" : ["secondary31", "secondary32"]}'
}

filters = {
    PRIMARY: ["primary1", "primary2", "primary3"],
    SECONDARY: {"primary1": ["secondary11", "secondary12"], "primary2": ["secondary21", "secondary22"],
                "primary3": ["secondary31", "secondary32"]}
}


class GetFiltersConfigTestCase(TestCase):
    """
    This class tests /visualization/get_filters API.
    """

    def setUp(self) -> None:
        self.client = Client()
        User.objects.create_user(
            username="user",
            password="pass"
        )
        user = User.objects.get(username="user")
        response = self.client.post(
            "/api/token/",
            data={"username": "user", "password": "pass"},
            content_type='application/json'
        )
        self.access_token = response.data["access"]
        self.user = User.objects.get(username="user")
        Config.objects.create(
            name=PROJECT["name"],
            heading=PROJECT["heading"],
            description=PROJECT["description"],
            user=self.user,
            filters=PROJECT["filters"]
        )
        self.config = Config.objects.get(user=self.user, name=PROJECT["name"])
        self.mdate = Data.objects.filter(name=self.config).aggregate(earliestTime=Min(Time), latestTime=Max(Time))

    """
    These set of functions test for custom visualizations
    """

    def test_get_filters_api_with_model_and_isDefault(self):
        response = self.client.get(
            "/api/visualization/get_filters/",
            {"isDefault": "false", "model": PROJECT["name"]},
            **{'HTTP_AUTHORIZATION': 'JWT ' + self.access_token}, content_type="application/json"
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[PRIMARY], filters[PRIMARY])
        self.assertEqual(response.json()[SECONDARY], filters[SECONDARY])
        self.assertEqual(response.json()[EARLIEST_TIME], self.mdate[EARLIEST_TIME])
        self.assertEqual(response.json()[LATEST_TIME], self.mdate[LATEST_TIME])

    def test_get_filters_api_with_model_without_isDefault(self):
        response = self.client.get(
            "/api/visualization/get_filters/",
            {"model": PROJECT["name"]},
            **{'HTTP_AUTHORIZATION': 'JWT ' + self.access_token}, content_type="application/json"
        )

        self.assertEqual(response.status_code, 400)

    def test_get_filters_api_without_model_with_isDefault(self):
        response = self.client.get(
            "/api/visualization/get_filters/",
            {"isDefault": "false"},
            **{'HTTP_AUTHORIZATION': 'JWT ' + self.access_token}, content_type="application/json"
        )

        self.assertEqual(response.status_code, 400)

    def test_get_filters_api_without_model_without_isDefault(self):
        response = self.client.get(
            "/api/visualization/get_filters/",
            **{'HTTP_AUTHORIZATION': 'JWT ' + self.access_token}, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)

    def test_isDefault(self):
        response = self.client.get(
            "/api/visualization/get_filters/",
            {"model": PROJECT["name"], "isDefault": "dummy"},
            **{'HTTP_AUTHORIZATION': 'JWT ' + self.access_token}, content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)

    def test_model_name(self):
        response = self.client.get(
            "/api/visualization/get_filters/",
            {"model": "dummy", "isDefault": "false"},
            **{'HTTP_AUTHORIZATION': 'JWT ' + self.access_token}, content_type="application/json"
        )
        self.assertEqual(response.status_code, 404)

    def test_anonymous_user(self):
        response = self.client.get(
            "/api/visualization/get_filters/",
            {"model": PROJECT["name"], "isDefault": "false"},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
