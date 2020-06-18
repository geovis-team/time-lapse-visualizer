from .constants import PRIMARY_FILTERS as PF, SECONDARY_FILTERS as SF
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


def validateJSON(obj,type):
  try:
    for k in obj.entity:
      obj.entity[k.strip()] = obj.entity.pop(k)
  except RuntimeError as e:
    raise ValidationError({'entity': _('Duplicate key name: "'+k+'"')})
  if not all(x in SF[type][obj.category] for x in obj.entity.keys()):
    l = []
    raise ValidationError({'entity': _('1 or more incorrect subfilters for selected Category "'+obj.category+'"')})
  try:
      for k in obj.entity.keys():
          if obj.entity[k] <= 0:
              raise ValidationError({'entity': _('Subfilter value must be greater than 0')})
  except TypeError as e:
      raise ValidationError({'entity': _('Wrong subfilter value; Only integer values accepted')})