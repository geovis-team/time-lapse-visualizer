from .constants import PRIMARY_FILTERS as PF, SECONDARY_FILTERS as SF
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def validateJSON(obj, type):
    """
    This method acts as a utility to validate the JSON data inputted in the Entity column 
    of the default visualization models.
    :param obj: specifies the model instance
    :param type: specifies the model
    :return:
    """
    # Remove trailing spaces from key name and check for duplicates after removal
    try:
        for k in obj.entity:
            obj.entity[k.strip()] = obj.entity.pop(k)
    except RuntimeError as e:
        raise ValidationError({'entity': _('Duplicate key name: "' + k + '"')})

    # Check that all subfilters are correct subfilters for the selected Category
    if not all(x in SF[type][obj.category] for x in obj.entity.keys()):
        raise ValidationError({'entity': _('Incorrect subfilter for selected Category: ' + obj.category)})

    # Check that values are positive
    try:
        for k in obj.entity.keys():
            if obj.entity[k] <= 0:
                raise ValidationError({'entity': _('Subfilter value must be greater than 0')})
    except TypeError as e:
        raise ValidationError({'entity': _('Wrong subfilter value; Only integer values accepted')})

