const fs = require("fs");
const csv = require("csv");

// https://www.eia.gov/dnav/pet/hist/LeafHandler.ashx?n=PET&s=EMM_EPM0_PTE_NUS_DPG&f=M
const priceOfGas = fs.readFileSync(
  "./data_processing/priceofgas19932017.csv",
  "utf-8"
);

csv.parse(priceOfGas, function(err, data) {
  if (err) console.log(err);
  const formatedData = {};
  data.map(row => {
    const year = row[0].split("-")[1];
    if (!year) return;
    const yearStr = year + "";
    if (formatedData.hasOwnProperty(yearStr)) {
      formatedData[yearStr].push(parseFloat(row[1], 10));
    } else {
      formatedData[yearStr] = [parseFloat(row[1], 10)];
    }
  });
  Object.keys(formatedData).forEach(yearKey => {
    const total = formatedData[yearKey].reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    console.log(`${yearKey},${total / formatedData[yearKey].length}`);
  });
});
