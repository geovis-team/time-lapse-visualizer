APP_NAME = 'tlv_app'

CLASSES = [
    "Covid",
    "Disasters",
    "Shops"
]

PRIMARY_FILTERS = [
    ["Mild", "Medium", "Severe"],
    ["cyclone", "earthquake", "temperature_rise", "GHGemissions"],
    ["shops", "covid_cases", "shops_closed", "medical_centres"],
]

SECONDARY_FILTERS = [
    {
        "Mild": ["reported", "unreported"],
        "Medium": ["symptomatic", "asymptomatic"],
        "Severe": ["recovered", "dead"]
    },
    {
        "cyclone": ["super_cyclonic_storm", "severe_cyclonic_storm", "cyclonic_storm", "deep_depression"],
        "earthquake": ["count"],
        "temperature_rise": ["value"],
        "GHGemissions": ["CO2", "SO2", "NO"]
    },
    {
        "shops": ["grocery", "stationary", "bakery", "salon"],
        "covid_cases": ["count"],
        "shops_closed": ["grocery", "stationary", "bakery", "salon"],
        "medical_centres": ["private", "government"]
    }
]

FILTERS = [
    {
        "primaryFilters": PRIMARY_FILTERS[0],
        "secondaryFilters": SECONDARY_FILTERS[0]
    },
    {
        "primaryFilters": PRIMARY_FILTERS[1],
        "secondaryFilters": SECONDARY_FILTERS[1]
    },
    {
        "primaryFilters": PRIMARY_FILTERS[2],
        "secondaryFilters": SECONDARY_FILTERS[2]
    }
]

Lat = 'latitude'
Lng = 'longitude'
Time = 'time'
Category = 'category'
Entity = 'entity'
