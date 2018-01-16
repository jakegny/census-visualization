import json
import pprint as pp

presidents_data = json.load(open('presidents_by_year.json'))
federal_budget_data = json.load(open('federal_budget_data.json'))
congressional_control_data = json.load(open('congressional_control.json'))
congress_session_mapping = json.load(open('session_mapping.json'))

# print(federal_budget_data)


def merge_two_dicts(x, y):
    z = x.copy()   # start with x's keys and values
    z.update(y)    # modifies z with y's keys and values & returns None
    return z


start_year = 1993
end_year = 2018

d = {}
for year in range(start_year, end_year):
    yearStr = str(year)
    firstCombined = merge_two_dicts(
        federal_budget_data[yearStr], presidents_data[yearStr])
    congress_session = congress_session_mapping[yearStr]
    # print(congress_session)
    secondCombined = merge_two_dicts(
        firstCombined, congressional_control_data[str(congress_session)])
    # GDP = federal_budget_data[str(year)]["GDP"]
    secondCombined['congressional_session'] = str(congress_session)
    # pp.pprint(secondCombined)
    d[yearStr] = secondCombined

with open('combined_data.json', 'w') as outfile:
    json.dump(d, outfile)
