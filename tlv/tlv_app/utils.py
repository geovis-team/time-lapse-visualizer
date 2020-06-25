from collections import Counter
import json, random
from tlv_app.models import Data
from django.core.exceptions import ValidationError
from tlv_app.constants import Lat, Lng, Time, Category, Entity, PRIMARY_FILTERS, \
    SECONDARY_FILTERS, FILTERS, DB_FORMAT_TYPES

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
        #get the date if datetime is given
        time = values[2].split(' ')[0]

        if type == DB_FORMAT_TYPES['TYPE_ZERO']:
            """
            type 0 refers to the default type i.e.,
            data is in the same format as out DB Schema
            """
            try:
                entity = values[4]
                if not isinstance(entity, dict):
                    entity = json.loads(entity)
                Data.objects.create(
                    latitude=latitude,
                    longitude=longitude,
                    time=time,
                    category=values[3],
                    entity=entity,
                    name=config
                )
            except ValidationError:
                pass

        if type == DB_FORMAT_TYPES['TYPE_ONE']:
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
                entity = entry.entity
                if entity.get(values[4], None) is not None:
                    entity[values[4]] += 1
                else:
                    entity[values[4]] = 1
                entry.entity = entity
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
                        entity=entity,
                        name=config
                    )
                except ValidationError:
                    pass


        elif type == DB_FORMAT_TYPES['TYPE_TWO']:
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
                    entity=entity,
                    name=config
                )
            except ValidationError:
                pass

        elif type == DB_FORMAT_TYPES['TYPE_THREE']:
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
                            entity=entity,
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


def multidict(pairs,mode=False):
    """
    This method aggregates the values corresponding to duplicate
    keys into a list and creates a dictionary with the obtained 
    (key,list) pair
    :param pairs: A list of (key,value) tuples
    :param mode: Boolean (False by default when called via
    json.load method)
    :return: a dictionary containing a list of one or more values
    corresponding to each key
    """
    toret = {}
    for key, value in pairs:
        if type(value) != dict and not mode:
            toret[key] = value
        else:
            toret.setdefault(key, []).append(value)
    return toret


def aggregator(dicts):
    """
    This method converts a list of dictionaries into a single 
    dictionary by aggregating values belonging to duplicate keys:
    Numeric values are summed up and String values are concatenated
    :param dicts: A list of dictionaries
    :return: A single dictionary
    """
    counter = Counter()
    strings = []
    for d in dicts:
        numerical = {k: int(v) for k,v in d.items() if str(v).isnumeric()} # Dict with Numerical values
        nonNumerical = {k: str(v) for k,v in d.items() if not str(v).isnumeric()} # Dict with Non-numerical values
        counter.update(numerical)
        strings.extend([(k,v) for k,v in nonNumerical.items()])
    strings = {k: '; '.join(v) for k,v in multidict(strings,True).items()}
    return {**counter, **strings}


def getRandomList(low, high, length=5):
    """
    This method creates a set of random numbers.
    :param length: Length of set to return
    :param low: lower bound for randint
    :param high: higher bound for randint
    :return: a set
    """
    numbers = set()
    if high-low+1 < length:
        return numbers

    for i in range(length):
        x = random.randint(low, high)
        while x in numbers:
            x = random.randint(-90000, 90000)
        numbers.add(x)
    return numbers


def getRandomChoice(values, length=5):
    """
    This method creates a set of random values chosen from a list.
    :param values: list of values to choose from
    :param length: length of set to return
    :return: a set
    """
    choices = set()
    if length > len(values):
        return choices 
    for i in range(length):
        fil = random.choice(values)
        while fil in choices:
            fil = random.choice(values)
        choices.add(fil)
    return choices


def dummyDataDefault(rfile_path, dfile_path):
    """
    This method creates 2 sets of dummy JSON data based on the Covid model,
    one in the database schema's format and one in the filter_data API's 
    response format.
    :param rfile_path: file path for the response file
    :param dfile_path: file path for the source data file 
    :return: 
    """


    # Create data in response format

    latitudes = [str(x/1000000) for x in getRandomList(-90000000,90000000)]
    longitudes = [str(x/1000000) for x in getRandomList(-180000000,180000000)]
    
    data = []
    start = 0
    year = 2000
    for lat in latitudes:
        for lng in longitudes:
            temp = {
                "latitude": lat + '0'*(6 - len(lat.split('.')[1])),  # Add trailing zeroes to match response format
                "longitude": lng + '0'*(6 - len(lng.split('.')[1])), # (6 precision spaces)
                "filter": {}
            }
            if not start:
                year+=1
            start= (start+1)%3

            PF = sorted(getRandomChoice(PRIMARY_FILTERS[0],random.randint(1,3)))
            for key in PF:
                temp["filter"][key] = {}
                SF = sorted(getRandomChoice(SECONDARY_FILTERS[0][key],random.randint(1,2)))
                for value in SF :
                    temp["filter"][key][value] = random.randint(1,50)
            temp["time"] = str(year)+"-"+str(10+start)+"-01"
            data.append(temp)

    response_data = json.dumps(data, indent=4)
    with open(rfile_path, "w") as f:
        f.write(response_data)

    # Split primary filters in response format to form tuples in database's schema and randomise "day" in Time
    db_data = []
    for tup in data:
        for primary in tup["filter"]:
                for secondary in tup["filter"][primary]:
                    temp = {
                            "latitude": tup["latitude"],
                            "longitude": tup["longitude"],
                            "time": tup["time"][:-2]+str(random.randint(10,28)),
                            "Category": primary,
                            "Entity": {secondary: tup["filter"][primary][secondary]}
                        }
                    if tup["filter"][primary][secondary] > 1 and not random.randint(0,3): # Randomly split subfilter values
                        temp1 = {**temp}
                        temp1["Entity"] = {**temp["Entity"]}
                        temp1["Entity"][secondary] = temp1["Entity"][secondary]//2
                        temp2 = {**temp}
                        temp2["Entity"] = {**temp["Entity"]}
                        temp2["Entity"][secondary] = tup["filter"][primary][secondary] - temp1["Entity"][secondary]
                        db_data.append(temp1)
                        db_data.append(temp2)
                    else:
                        db_data.append(temp)

    source_data = json.dumps(db_data, indent=4)
    with open(dfile_path, "w") as f:
        f.write(source_data)





                



    
