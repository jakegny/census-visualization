import json
import pprint as pp

presidents_data = json.load(open('presidents.json'))

d = {}
# print(federal_b
for president_obj in presidents_data:
    # print(president_obj)
    start_year = int(president_obj['took_office'][:4])
    if president_obj['left_office'] is None:
        end_year = 2018  # this should be dynamic
    else:
        end_year = int(president_obj['left_office'][:4]) - 1
    # print(end_year)
    for year in range(start_year, end_year + 1):
        p = {}
        p["name"] = president_obj['president']
        p["party"] = president_obj['party']
        d[str(year)] = p

with open('presidents_by_year.json', 'w') as outfile:
    json.dump(d, outfile)
