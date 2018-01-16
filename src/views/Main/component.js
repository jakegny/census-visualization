import React from "react";
import LineChart from "../LineChart";

const Main = props => {
  console.log("props", props);
  return (
    <div>
      <h1>ADD COMPONENT HERE</h1>
      <LineChart data={props.data} />
    </div>
  );
};

export default Main;
