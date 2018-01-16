// import _ from "lodash";

const convertToArray = data => {
  const arrayData = [];
  Object.keys(data).forEach(year => {
    arrayData.push(Object.assign({}, data[year], { year: parseInt(year) }));
  });
  return arrayData;
};

const populationByYear = data => {
  return data.map(item => ({
    year: item.year,
    value: item.population
  }));
};

export default {
  convertToArray,
  populationByYear
};
