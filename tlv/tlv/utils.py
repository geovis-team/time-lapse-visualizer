from tlv_app.serializers import UserSerializer
from collections import Counter
from tlv_app.constants import Lat, Lng, Time, Category, Entity


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }


def convertSchema(data, type):
    if data == []:
        return []

    converted_data = []
    if type == 1:
        temp = {}
        for row in data:
            vals = list(row.values())
            key = tuple(vals[:4])
            if key in temp:
                temp[key][Entity].update({str(vals[4]).strip().lower(): 1})
            else:
                temp[key] = {}
                temp[key][Lat] = key[0]
                temp[key][Lng] = key[1]
                temp[key][Time] = key[2]
                temp[key][Category] = key[3]
                temp[key][Entity] = Counter({str(vals[4]).strip().lower(): 1})
        converted_data = list(temp.values())
        for row in converted_data:
            row[Entity] = dict(row[Entity])
    elif type == 2 or type == 3 or type == 4:
        for row in data:
            temp = {}
            keys = list(row.keys())
            vals = list(row.values())
            temp[Lat] = vals[0]
            temp[Lng] = vals[1]
            temp[Time] = vals[2]
            if type == 2 or type == 3:
                temp[Category] = vals[3]
                temp[Entity] = {k : row[k] for k in keys[4:]}
            else:
                temp[Category] = Category
                temp[Entity] = {k : row[k] for k in keys[3:] if row[k] != 0}
            converted_data.append(temp)
    return converted_data
