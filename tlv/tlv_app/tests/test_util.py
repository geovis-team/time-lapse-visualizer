from django.test import TestCase
import random
import json
from collections import Counter
from django.contrib.auth.models import User

from tlv_app.utils import convert_schema, data_type_one, data_type_two, data_type_three
from tlv_app.models import Config, Data
from tlv_app.constants import FILTERS, PRIMARY_FILTERS, SECONDARY_FILTERS, Lat, Lng, \
    Time, Category, Entity, DB_FORMAT_TYPES


class UtilConvertSchemaTestCase(TestCase):
    """
    This class contains tests for all the three probable
    data format types.
    """

    def setUp(self):
        User.objects.create(
            username="user",
            password="pass"
        )

    def test_type_one(self):
        """
        This method tests for the conversion of type one.
        :return:
        """
        Config.objects.create(
            name=f"Covid1",
            heading="covid",
            description="covid",
            user=User.objects.get(username="user"),
            filters=json.dumps(SECONDARY_FILTERS[0])
        )
        file_path = "d1.json"
        config = Config.objects.get(name="Covid1")
        data = data_type_one(file_path)
        file = open(file_path, "r")
        convert_schema(config, file, DB_FORMAT_TYPES['TYPE_ONE'])
        added = {
            "latitude": [],
            "longitude": [],
            "time": [],
            "category": []
        }
        count = 0
        for row in data:
            values = list(row.values())
            latitude = values[0]
            longitude = values[1]
            time = values[2]
            category = values[3]
            if latitude in added["latitude"] and longitude in added["longitude"] and time in added[
                "time"] and category in added["category"]:
                continue
            else:
                count += 1
                added["latitude"].append(latitude)
                added["longitude"].append(longitude)
                added["time"].append(time)
                added["category"].append(category)
        assert count == len(Data.objects.filter(name=config))

    def test_convert_type_two(self):
        """
        This method tests for the conversion of type two.
        :return:
        """
        user = User.objects.get(username="user")
        Config.objects.create(
            name=f"GApps",
            heading="GApps",
            description="GApps",
            user=user,
            filters=json.dumps(SECONDARY_FILTERS[3])
        )
        file_path = "d2.json"
        config = Config.objects.get(name="GApps")
        data = data_type_two(file_path)
        file = open(file_path, "r")
        convert_schema(config, file, DB_FORMAT_TYPES['TYPE_TWO'])
        assert len(data) == len(Data.objects.filter(name=config))

    def test_convert_type_three(self):
        """
        This method tests for the conversion of type three.
        :return:
        """
        Config.objects.create(
            name=f"Covid3",
            heading="covid",
            description="covid",
            user=User.objects.get(username="user"),
            filters=json.dumps(SECONDARY_FILTERS[0])
        )
        file_path = "d3.json"
        config = Config.objects.get(name="Covid3")
        data = data_type_three(file_path)
        file = open(file_path, "r")
        convert_schema(config, file, DB_FORMAT_TYPES['TYPE_THREE'])
        count = 0
        for row in data:
            filters = json.loads(config.filters)
            for category in filters:
                has_category = False
                for sub_filter in filters[category]:
                    try:
                        if row[sub_filter] != 0:
                            has_category = True
                            break
                    except KeyError:
                        pass
                if has_category is True:
                    count += 1
        assert count == len(Data.objects.filter(name=config))
