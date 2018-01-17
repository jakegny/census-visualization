import requests
from bs4 import BeautifulSoup
import json
import pprint as pp


def moneyToInt(value):
    if not "$" in value:
        # print("not money", value)
        return value
    else:
        no_dollar = value[1:]
        split = no_dollar.split()
        if split[1] == 'trillion' or split[1] == 'Trillion':
            return float(split[0]) * 1000000000000
        elif split[1] == 'billion' or split[1] == 'Billion':
            return float(split[0]) * 1000000000
        else:
            # print('what is this?', value)
            return value


wikiFormat = "https://en.wikipedia.org/wiki/{year}_United_States_federal_budget"
starting_year = 1993  # This is the first year wiki has for us federal budget
ending_year = 2018
d = {}
for year in range(starting_year, ending_year):
    yearDict = {}
    url = wikiFormat.format(year=str(year))
    page = requests.get(url)

    soup = BeautifulSoup(page.text, 'html.parser')

    budget = soup.find(class_="infobox vevent")

    rows = budget.find_all('tr')

    for row in rows:
        keyHtml = row.find('th')
        valueHtml = row.find('td')
        if(keyHtml is None or valueHtml is None):
            continue
        key = keyHtml.contents[0]
        value = valueHtml.contents[0]
        if (key.name == "a"):
            key = key.get_text()
        if (value.name == "a"):
            value = value.get_text()
        value = moneyToInt(value)
        yearDict[key] = value

    d[str(year)] = yearDict

with open('federal_budget_data.json', 'w') as outfile:
    json.dump(d, outfile)
