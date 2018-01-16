

"""
Data should end up looking like this:

{
    "1993": {
        "president": "...",
        "president_party: "...",
        "house_majority": "...",
        "senate_majority": "...",
        "congressional_session": "...",
        "federal_debt": "...", // debt || federal_debt
        "federal_spending": "...", // total expendituers || federal_spending
        "minimum_wage": "...",
        "unemployment": "...",
        "population": : "...",
        life_expectancy: "...",
        median_household_income: "...",
        adjusted_median_household_income: "...",
        cost_of: {
            new_home: "...",
            stamp: "...",
            gallon_of_gas: "...",
            gallon_of_milk: "...",
            dozen_eggs: "...",
            college: : "...",
        }
    }
}


"""
import json
import pprint as pp

hand_compiled_data = json.load(open('hand_compiled_data.json'))
combined_data = json.load(open('combined_data.json'))

# for year, data in hand_compiled_data['data'].items():
#     print(year)
#     print()
#     print(data)

##
# THIS SECTION IS UP TO 1999
##
hand_compiled_year_start = 1960
hand_compiled_year_end = 1999

final_dict = {}

HAND_COMPILED_KEYS_TO_KEEP = {
    "president",
    "house_majority",
    "senate_majority",
    "population",
    "federal_spending",
    "federal_debt",
    "minimum_wage",
    "unemployment",
    "adjusted_median_househould_income",
    "cost_of"
}

COMBINED_KEYS_TO_KEEP = {
    "minimum_wage",
    "unemployment",
    "adjusted_median_househould_income",
    "cost_of",
    "population"
}


def remove_keys(d, keys):
    return {x: d[x] for x in d if x in keys}


def merge_two_dicts(x, y):
    z = x.copy()   # start with x's keys and values
    z.update(y)    # modifies z with y's keys and values & returns None
    return z


for year in range(hand_compiled_year_start, hand_compiled_year_end + 1):
    yearStr = str(year)
    hand_data = hand_compiled_data['data'][yearStr]
    cleaned_data = remove_keys(hand_data, HAND_COMPILED_KEYS_TO_KEEP)
    # renaming for formatting
    # white_house > president_party
    #
    cleaned_data['president_party'] = hand_data['white_house']
    try:
        cleaned_data['congressional_session'] = combined_data[yearStr]['congressional_session']
    except:
        pass
    # pp.pprint(cleaned_data)
    final_dict[yearStr] = cleaned_data

##
# This is the 2000+ section
##

combine_year_start = 2000
combine_year_end = 2017


def get_prop(obj, propName):
    try:
        value = obj[propName]
    except:
        value = 'N/A'
    return value


for year in range(combine_year_start, combine_year_end):
    yearStr = str(year)
    hand_data = hand_compiled_data['data'][yearStr]
    cleaned_hand_data = remove_keys(hand_data, COMBINED_KEYS_TO_KEEP)

    combined = combined_data[yearStr]
    new_dict = {}
    new_dict['president'] = get_prop(combined, 'name')
    new_dict['president_party'] = get_prop(combined, 'party')[:1]
    new_dict['house_majority'] = get_prop(combined, 'House Majority')[:1]
    new_dict['senate_majority'] = get_prop(combined, 'Senate Majority')[:1]
    new_dict['federal_spending'] = get_prop(combined, 'Total expenditures')
    new_dict['federal_debt'] = get_prop(combined, 'Debt')
    new_dict['congressional_session'] = get_prop(
        combined, 'congressional_session')
    merged_dict = merge_two_dicts(cleaned_hand_data, new_dict)
    # pp.pprint(merged_dict)
    final_dict[yearStr] = merged_dict

# pp.pprint(final_dict)
with open('combined_formated_data.json', 'w') as outfile:
    json.dump(final_dict, outfile)
