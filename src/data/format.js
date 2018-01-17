// import _ from "lodash";

const convertToArray = data => {
  const arrayData = [];
  Object.keys(data).forEach(year => {
    arrayData.push(Object.assign({}, data[year], { year: parseInt(year) }));
  });
  return arrayData;
};

const maxValueOfProperty = (data, property) => {
  return Math.max.apply(
    Math,
    data.map(function(item) {
      if (isNaN(item[property])) {
        return 0;
      }
      return item[property];
    })
  );
};

const bothControl = item => {
  const democrat =
    (item.senate_majority === "D" ? 1 : 0) +
    (item.house_majority === "D" ? 1 : 0) +
    (item.president_party === "D" ? 1 : 0);
  const republican = 3 - democrat;
  return {
    democrat,
    republican
  };
};

const congressionalControl = item => {
  const democrat =
    (item.senate_majority === "D" ? 1 : 0) +
    (item.house_majority === "D" ? 1 : 0);
  const republican = 2 - democrat;
  return {
    democrat,
    republican
  };
};

const presidentControl = item => {
  const democrat = item.president_party === "D" ? 1 : 0;
  const republican = 1 - democrat;
  return {
    democrat,
    republican
  };
};

const partyInfluence = (item, partyKey) => {
  switch (partyKey) {
    case "both":
      return bothControl(item);
    case "president_party":
      return presidentControl(item);
    case "congressional_party":
      return congressionalControl(item);
    default:
      return {};
  }
};

const valueByYear = (data, property, partyKey) => {
  return data.map(item => {
    const party = partyInfluence(item, partyKey);
    return {
      year: item.year,
      democrat: party.democrat,
      republican: party.republican,
      [property]: item[property]
    };
  });
};

const percentageChange = (data, property, partyKey) => {
  let lastValue = null;
  return data.map(item => {
    const party = partyInfluence(item, partyKey);
    let percentChange = 0;
    if (lastValue !== null) {
      percentChange = (item[property] - lastValue) / lastValue * 100;
    }
    lastValue = item[property];

    return {
      year: item.year,
      democrat: party.democrat,
      republican: party.republican,
      [property]: item[property],
      percent_change: percentChange
    };
  });
};

export default {
  convertToArray,
  valueByYear,
  percentageChange
};
