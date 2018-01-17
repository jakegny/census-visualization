import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ComposedChart,
  Tooltip,
  CartesianGrid,
  Brush,
  LabelList,
  AreaChart,
  Area,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import format from "../../data/format";

const component = props => {
  const formatFunc = props.formatFunc;
  const data = formatFunc(props.data, props.dataValue, props.partyKey);
  const dataKey = "percent_change";
  // console.log("data", data);

  return (
    <div>
      <p>{props.chartTitle || "PercentChangeChart"}</p>
      <div
        className="line-chart-wrapper"
        style={{
          margin: "auto",
          width: "75%",
          height: "400px",
          backgroundColor: "#f5f5f5"
        }}
      >
        <ResponsiveContainer>
          <ComposedChart
            height={400}
            data={data}
            margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
          >
            <XAxis dataKey="year" label="Year" />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={false}
              yAxisId={1}
              domain={[0, 1]}
            />
            <YAxis yAxisId={0} />
            <Tooltip />

            <Area
              stackId="0"
              dataKey="democrat"
              stroke="#232066"
              fill="#232066"
              yAxisId={1}
            />

            <Area
              stackId="0"
              dataKey="republican"
              stroke="#983D3D"
              fill="#983D3D"
              yAxisId={1}
            />
            <Line dataKey={dataKey} stroke="#000" dot={false} yAxisId={0} />
            <ReferenceLine y={0} stroke="#444" />

            <Brush dataKey="year" startIndex={data.length - 40}>
              <AreaChart>
                <CartesianGrid />
                <YAxis hide domain={["auto", "auto"]} />
                <Area
                  dataKey={dataKey}
                  stroke="#ff7300"
                  fill="#ff7300"
                  dot={false}
                />
              </AreaChart>
            </Brush>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default component;
