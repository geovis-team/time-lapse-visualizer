from django.shortcuts import render
from .models import Covid, Disasters, Shops
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import FilterDataSerializer

# Get all filters

@api_view()
def filter(request, model):
  # model = request.GET['model']
  if model == 'Covid':
    return Response(
      {
        "primaryFilters": ["Mild", "Medium", "Severe"], 
        "secondaryFilters": 
        {
          "Mild": ["reported", "unreported"], 
          "Medium": ["symptomatic", "asymptomatic"], 
          "Severe": ["recovered", "dead"] 
        }
      })
  elif model == 'Disasters':
    return Response(
      {
        "primaryFilters": ["cyclone", "earthquake","temperature_rise","GHGemissions"], 
        "secondaryFilters":
        {
          "cyclone": ["super_cyclonic_storm", "severe_cyclonic_storm","cyclonic_storm","deep_depression"],
          "earthquake": ["count"],
          "temperature_rise": ["value"],
          "GHGemissions": ["CO2","SO2","NO"]
        }
      })
  elif model == 'Shops':
    return Response(
      {
        "primaryFilters": ["shops","covid_cases","shops_closed","medical_centres"], 
        "secondaryFilters":
        {
          "shops": ["grocery", "stationary","bakery","salon"],
          "covid_cases": ["count"],
          "shops_closed": ["grocery", "stationary","bakery","salon"],
          "medical_centres": ["private", "government"]
        }
      })
  return Response({"filters": []})

# Get data corresponding to given filters

@api_view()
def filter_data(request, model, filterString):
  filters = filterString.split("+")
  filters = list(dict.fromkeys(filters))
  print(filters)
  data = {}
  if model == "Covid":
    subtypes = {
      "Mild": ["reported", "unreported"],
      "Medium": ["symptomatic", "asymptomatic"],
      "Severe": ["recovered", "dead"]
    }
  elif model == "Disasters":
    subtypes = {
      "cyclone": ["super_cyclonic_storm", "severe_cyclonic_storm","cyclonic_storm","deep_depression"],
      "earthquake": ["count"],
      "temperature_rise": ["value"],
      "GHGemissions": ["CO2","SO2","NO"]
    }
  elif model == "Shops":
    subtypes = {
      "shops": ["grocery", "stationary","bakery","salon"],
      "covid_cases": ["count"],
      "shops_closed": ["grocery", "stationary","bakery","salon"],
      "medical_centres": ["private", "government"]
    }
  else:
    return Response({"primaryFilters": [], "data": {}})

  if not all(x in subtypes.keys() for x in filters):
    return Response({"primaryFilters": [], "data": {}})
  
  for filter in filters:
    data[filter] = {}
    for subtype in subtypes[filter]:
      q = Covid.objects.filter(category=filter).filter(entity__has_key=subtype).values("latitude","longitude","time")
      serializer = FilterDataSerializer(q,many=True)
      data[filter][subtype] = serializer.data
  return Response({"primaryFilters":filters, "data":data})

