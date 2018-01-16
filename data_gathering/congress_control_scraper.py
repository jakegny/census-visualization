import requests
from bs4 import BeautifulSoup
import json
import pprint as pp
import math

wikiFormat = "https://en.wikipedia.org/wiki/{congress}_United_States_Congress"
starting_congress = 86  # starts in the 60s
ending_congress = 116  # current
d = {}


def ordinal(n): return "%d%s" % (
    n, "tsnrhtdd"[(math.floor(n / 10) % 10 != 1) * (n % 10 < 4) * n % 10::4])


for congress in range(starting_congress, ending_congress):
    congressDict = {}
    url = wikiFormat.format(congress=ordinal(congress))
    page = requests.get(url)

    soup = BeautifulSoup(page.text, 'html.parser')

    budget = soup.find(class_="infobox vevent")

    if budget is None:
        print("something went wrong", url),
        continue

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
        congressDict[key] = value

    d[str(congress)] = congressDict

with open('congressional_control.json', 'w') as outfile:
    json.dump(d, outfile)
