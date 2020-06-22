from collections import Counter
import json, random
from tlv_app.models import Data
from django.core.exceptions import ValidationError
from tlv_app.constants import Lat, Lng, Time, Category, Entity, PRIMARY_FILTERS, SECONDARY_FILTERS, FILTERS


def convert_schema(config, data_file, type):
    """
    This method converts the user data to the required format
    and stores in the database
    :param config: The config model related to data file
    :param data_file: file containing data in json format
    :param type: type defines the data source format types given by user
    :return:
    """
    try:
        data = json.load(data_file)
    except Exception as e:
        data = []

    if len(data) is 0:
        return

    for row in data:
        keys = list(row.keys())
        values = list(row.values())
        latitude = values[0]
        longitude = values[1]
        time = values[2]
        if type == '1':
            """
            if type is 1 the given data format is:
            data = [
                {
                    "latitude": 20,
                    "longitude": 20,
                    "time": 1-10-2020
                    "category": "Shops"
                    "entity": "grocery"
                },
                {
                    "latitude": 20,
                    "longitude": 20,
                    "time": 1-10-2020
                    "category": "Shops"
                    "entity": "stationary"
                },
                {
                    "latitude": 30,
                    "longitude": 20,
                    "time": 1-10-2020
                    "category": "Shops"
                    "entity": "grocery"
                },
            ]
            """
            category = values[3]
            try:
                # checks if model instance already exists and updates
                # the entity field appropriately
                entry = Data.objects.get(latitude=latitude,
                                         longitude=longitude,
                                         time=time,
                                         category=category,
                                         name=config)
                entity = json.loads(entry.entity)
                if entity.get(values[4], None) is not None:
                    entity[values[4]] += 1
                else:
                    entity[values[4]] = 1
                entry.entity = json.dumps(entity)
                entry.save()
            except Data.DoesNotExist:
                # if not then just makes a suitable new entry
                entity = {
                    values[4]: 1
                }
                try:
                    Data.objects.create(
                        latitude=latitude,
                        longitude=longitude,
                        time=time,
                        category=category,
                        entity=json.dumps(entity),
                        name=config
                    )
                except ValidationError:
                    pass

        elif type == '2':
            """
            if type is 2 the given data format is:
            data = [
                {
                    "latitude": 28.66,
                    "longitude": 133.447,
                    "time": "2014-10-16",
                    "category": "GPay",
                    "num_users": 3823,
                    "hrs_used": 9398
                },
                {
                    "latitude": 64.002,
                    "longitude": -31.637,
                    "time": "2004-9-16",
                    "category": "GPay",
                    "num_users": 5146,
                    "hrs_used": 1690,
                }
            ]
            """

            category = values[3]
            # clubs the entries in different columns after the 4th to form
            # a single entity
            entity = {k: row[k] for k in keys[4:]}
            try:
                Data.objects.create(
                    latitude=latitude,
                    longitude=longitude,
                    time=time,
                    category=category,
                    entity=json.dumps(entity),
                    name=config
                )
            except ValidationError:
                pass

        elif type == '3':
            """
            the data format for type 3 is :
            data = [
                {
                    "latitude": 69.131,
                    "longitude": -86.411,
                    "time": "2004-2-28",
                    "reported": 7,
                    "unreported": 2,
                    "symptomatic": 3,
                    "asymptomatic": 10,
                    "recovered": 0,
                    "dead": 8
                },
                {
                    "latitude": 23.13,
                    "longitude": -18.555,
                    "time": "2019-11-8",
                    "reported": 9,
                    "unreported": 1,
                    "symptomatic": 10,
                    "asymptomatic": 4,
                    "recovered": 3,
                    "dead": 7
                }
            ]
            """
            filters = json.loads(config.filters)
            for category in list(filters.keys()):
                entity = {}
                # forms an entity dict that has a sub filter only if the
                # corresponding value is non-zero
                for sub_filter in filters[category]:
                    try:
                        if row[sub_filter] != 0:
                            entity[sub_filter] = row[sub_filter]
                    except KeyError:
                        pass
                if entity != {}:
                    try:
                        Data.objects.create(
                            latitude=latitude,
                            longitude=longitude,
                            time=time,
                            category=category,
                            entity=json.dumps(entity),
                            name=config
                        )
                    except ValidationError:
                        pass


def get_time():
    """This method returns a random date in suitable format."""
    yr = random.randint(2000, 2020)
    month = random.randint(1, 12)
    date = random.randint(1, 28)
    time = f"{yr}-{month}-{date}"
    return time


def data_type_one(file_path):
    """
    This method creates dummy data for type 1 as used in the
    convert_schema method.
    :return: the data array of objects
    """
    data = []
    for i in range(10):
        category = random.choice(PRIMARY_FILTERS[0])
        temp = {
            "latitude": random.randint(-90000, 90000) / 1000,
            "longitude": random.randint(-180000, 180000) / 1000,
            "time": get_time(),
            "category": category,
            "entity": random.choice(SECONDARY_FILTERS[0][category])
        }
        data.append(temp)
        temp["category"] = random.choice(PRIMARY_FILTERS[0])
        temp["entity"] = random.choice(SECONDARY_FILTERS[0][temp['category']])
        data.append(temp)
    json_data = json.dumps(data, indent=4)
    with open(file_path, "w") as f:
        f.write(json_data)
    return data


def data_type_two(file_path):
    """
    This method creates dummy data for type 2 as used in the
    convert_schema method.
    :return: the data array of objects
    """
    data = []
    for i in range(10):
        category = random.choice(PRIMARY_FILTERS[3])
        temp = {
            "latitude": random.randint(-90000, 90000) / 1000,
            "longitude": random.randint(-180000, 180000) / 1000,
            "time": get_time(),
            "category": category,
        }
        for x in SECONDARY_FILTERS[3][category]:
            temp[x] = random.randint(1000, 10000)
        data.append(temp)
    json_data = json.dumps(data, indent=4)
    with open(file_path, "w") as f:
        f.write(json_data)
    return data


def data_type_three(file_path):
    """
    This method creates dummy data for type 3 as used in the
    convert_schema method.
    :return: the data array of objects
    """
    data = []
    keys = list(SECONDARY_FILTERS[0].values())
    for i in range(10):
        temp = {
            "latitude": random.randint(-90000, 90000) / 1000,
            "longitude": random.randint(-180000, 180000) / 1000,
            "time": get_time(),
        }
        for secondary_filters in keys:
            for secondary_filter in secondary_filters:
                temp[secondary_filter] = random.randint(0, 10)
        data.append(temp)
    json_data = json.dumps(data, indent=4)
    with open(file_path, "w") as f:
        f.write(json_data)
    return data
