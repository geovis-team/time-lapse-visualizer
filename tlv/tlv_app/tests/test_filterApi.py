from tlv_app.models.mvp import Covid, Disasters, Shops
from django.urls import reverse
from django.urls import path, include
from django.contrib.auth.models import User
from tlv_app.utils import convert_schema
from tlv_app.constants import SECONDARY_FILTERS as SF, PRIMARY_FILTERS as PF, DB_FORMAT_TYPES, primaryFilters, \
    secondaryFilters, Data
from tlv_app.models.config import Config
from tlv_app.views.mvp import filter_data
from django.test import RequestFactory, TestCase, Client
import json


class FilterDataDefault(TestCase):
    """
    This class tests the filter_data API endpoint for requests on
    Default visualizations only. (Tested on Covid model)
    """

    def setUp(self):
        i = 1
        for key in PF[0]:
            Covid.objects.create(
                latitude=23.23453,
                longitude=77.23456,
                time="2020-0" + str(i) + "-09",
                category=key,
                entity={SF[0][key][0]: 2}
            )
            i += 1

    def test_noModelName(self):
        """
        This method tests for HTTP_400 status on no model name being given.
        :return:
        """
        response = self.client.get(
            '/api/visualization/filter_data/',
            {
                'isDefault': 'true'
            },
            format='json'
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, "Model name not passed in params")

    def test_incorrectModelName(self):
        """
        This method tests for HTTP_404 status on incorrect model name being given.
        :return:
        """
        response = self.client.get(
            '/api/visualization/filter_data/',
            {
                'model': 'SomeRandomName',
                'isDefault': 'true'
            },
            format='json'
        )
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data, "Model with given name does not exist")

    def test_incorrectFiltersName(self):
        """
        This method tests for HTTP_400 status on incorrect filter name being given.
        :return:
        """
        response = self.client.get(
            '/api/visualization/filter_data/',
            {
                'model': 'Covid',
                'filters': ['randomFilter', 'Mild'],
                'isDefault': 'true'
            },
            format='json'
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, "Filters specified do not exist for the given model")

    def test_isDefaultNotSet(self):
        """
        This method tests for HTTP_400 status when missing or unset argument isDefault is
        used for accessing Default visualizations.
        :return:
        """
        response = self.client.get(
            '/api/visualization/filter_data/',
            {
                'model': 'Covid',
                'filters': ['Mild'],
                'isDefault': 'false'
            },
            format='json'
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, "Invalid isDefault")

        response = self.client.get(
            '/api/visualization/filter_data/',
            format='json'
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, "Invalid isDefault")

    def test_defaultOutput(self):
        """
        This method tests for the default output format when no filters are given.
        :return:
        """
        response = self.client.get(
            '/api/visualization/filter_data/',
            {
                'model': 'Covid',
                'isDefault': 'true'
            },
            format='json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[primaryFilters], [PF[0][0]])
        self.assertEqual(len(response.data[Data]), 1)

    def test_output(self):
        """
        This method tests the output of the API when correct filters are given
        :return:
        """
        response = self.client.get(
            '/api/visualization/filter_data/',
            {
                'model': 'Covid',
                'isDefault': 'true',
                'filters': [PF[0][0]]
            },
            format='json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[primaryFilters], [PF[0][0]])
        self.assertEqual(len(response.data[Data]), 1)

        response = self.client.get(
            '/api/visualization/filter_data/',
            {
                'model': 'Covid',
                'isDefault': 'true',
                'filters': PF[0]
            },
            format='json'
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[primaryFilters], PF[0])
        self.assertEqual(len(response.data[Data]), 3)


class FilterDataUser(TestCase):
    """
    This class tests on filter_data API requests made by authenticated users
    :return:
    """

    def setUp(self):
        self.client = Client()
        User.objects.create_user(
            username="tlv_user",
            password="tlv_pass"
        )
        user = User.objects.get(username="tlv_user")
        response = self.client.post(
            "/api/token/",
            {
                "username": "tlv_user",
                "password": "tlv_pass"
            },
            content_type="application/json"
        )
        self.access_token = response.data["access"]

        Config.objects.create(
            name=f"CoronaCases",
            heading="heading",
            description="desc",
            user=user,
            filters=json.dumps(SF[0])
        )
        config = Config.objects.get(user=user, name="CoronaCases")
        file_path = "source.json"
        file = open(file_path, 'r')
        convert_schema(config, file, DB_FORMAT_TYPES['TYPE_ZERO'])

    def test_response(self):
        """
        This method tests the output of the API against a dummy response file after populating
        the DB with tuples obtained from randomly splitting the "filter" object (function used: utils.dummyDataDefault)
        :return:
        """
        response = self.client.get(
            "/api/visualization/filter_data/",
            {
                "isDefault": "false",
                "model": "CoronaCases",
                "filters": PF[0]
            },
            **{"HTTP_AUTHORIZATION": f"JWT " + self.access_token},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)

        to_comp = json.load(open("response.json"))

        self.assertCountEqual(response.data[Data], to_comp)

    def test_format(self):
        """
        This method tests the output of format of the API response.
        :return:
        """
        response = self.client.get(
            "/api/visualization/filter_data/",
            {
                "isDefault": "false",
                "model": "CoronaCases",
                "filters": PF[0][:2]
            },
            **{"HTTP_AUTHORIZATION": f"JWT " + self.access_token},
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)

        self.assertEqual(response.data[primaryFilters], PF[0][:2])

        self.assertTrue(response.data[Data])

    def test_anonymousUserAccess(self):
        """
        This method tests whether an anonymous user can access a user's resources
        :return:
        """
        self.client = Client()
        response = self.client.get(
            "/api/visualization/filter_data/",
            {
                "isDefault": "false",
                "model": "CoronaCases",
                "filters": PF[0][:2]
            }
        )
        self.assertEqual(response.status_code, 400)
