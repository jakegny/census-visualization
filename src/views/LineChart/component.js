import React from "react";
import {
  // ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  // ReferenceLine,
  // ReferenceDot,
  Tooltip,
  CartesianGrid,
  // Legend,
  Brush,
  // ErrorBar,
  AreaChart,
  Area
  // Label,
  // LabelList
} from "recharts";
import format from "../../data/format";

const component = props => {
  const populationData = format.populationByYear(props.data);
  console.log("populationData", populationData);

  return (
    <div>
      <p>LineChart </p>
      <div className="line-chart-wrapper">
        <LineChart
          width={600}
          height={400}
          data={populationData}
          margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="year" label="Year" />
          <YAxis domain={["auto", "auto"]} label="Population" />
          <Tooltip />
          <Line dataKey="value" stroke="#ff7300" dot={false} />
          <Brush dataKey="year" startIndex={populationData.length - 40}>
            <AreaChart>
              <CartesianGrid />
              <YAxis hide domain={["auto", "auto"]} />
              <Area
                dataKey="value"
                stroke="#ff7300"
                fill="#ff7300"
                dot={false}
              />
            </AreaChart>
          </Brush>
        </LineChart>
      </div>
    </div>
  );
};

export default component;
