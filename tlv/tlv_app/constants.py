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
    ["Maps", "Ads", "GPay", "Youtube"]
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
    },
    {
        "Maps": ["num_users", "hrs_usage"],
        "Ads": ["num_users", "hrs_usage"],
        "GPay": ["num_users", "hrs_usage"],
        "Youtube": ["num_users", "hrs_usage"]
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
    },
    {
        "primaryFilters": PRIMARY_FILTERS[3],
        "secondaryFilters": SECONDARY_FILTERS[3]
    }
]

DB_FORMAT_TYPES = {
    'TYPE_ZERO': '0',
    'TYPE_ONE': '1',
    'TYPE_TWO': '2',
    'TYPE_THREE': '3'
}

Lat = 'latitude'
Lng = 'longitude'
Time = 'time'
Category = 'category'
Entity = 'entity'
Data = "data"

primaryFilters = "primaryFilters"
secondaryFilters = "secondaryFilters"
