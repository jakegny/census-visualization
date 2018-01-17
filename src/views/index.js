import React, { Component } from "react";
import Main from "./Main";
import data from "../data/combined_formated_data.json";
import format from "../data/format";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main data={format.convertToArray(data)} />
      </div>
    );
  }
}

export default App;
