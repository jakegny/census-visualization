import React from "react";
import Select from "react-select";
import "./styles.css";
import LineChart from "../LineChart";
import PercentChangeLineChart from "../PercentChangeLineChart";
import format from "../../data/format";

const dataOptions = [
  { value: "minimum_wage", label: "Minimum Wage" },
  { value: "unemployment", label: "Unemployment" },
  { value: "population", label: "Population" },
  { value: "federal_spending", label: "Federal Spending" },
  { value: "federal_debt", label: "Federal Debt" }
];

const partyOptions = [
  { value: "president_party", label: "Presidential Party" },
  { value: "congressional_party", label: "Congressional Party" },
  { value: "both", label: "Both" }
];

class Main extends React.Component {
  state = {
    selectedData: {
      value: "population",
      label: "Population"
    },
    selectedParty: {
      value: "both",
      label: "Both"
    },
    chartName: "Population"
  };
  handleDataChange = selectedData => {
    this.setState({ selectedData, chartName: selectedData.label });
    console.log(`Selected: ${selectedData.label}`);
  };
  handlePartyChange = selectedParty => {
    this.setState({ selectedParty });
    console.log(`Selected: ${selectedParty.label}`);
  };
  render() {
    const { selectedData, selectedParty } = this.state;
    const dataValue = (selectedData && selectedData.value) || "population";
    return (
      <div>
        <h1>Charts</h1>
        <div className="mainContainer">
          <div className="mainOne">
            <Select
              name="form-field-name"
              value={selectedData.value}
              onChange={this.handleDataChange}
              options={dataOptions}
            />
          </div>
          <div className="mainTwo">
            <Select
              name="form-field-name"
              value={selectedParty.value}
              onChange={this.handlePartyChange}
              options={partyOptions}
            />
          </div>
        </div>
        <LineChart
          data={this.props.data}
          dataKey={dataValue}
          partyKey={selectedParty.value}
          formatFunc={format.valueByYear}
          chartTitle={this.state.chartName}
        />

        <PercentChangeLineChart
          data={this.props.data}
          dataValue={dataValue}
          partyKey={selectedParty.value}
          formatFunc={format.percentageChange}
          chartTitle={`Percent Change in ${this.state.chartName}`}
        />
      </div>
    );
  }
}

export default Main;
