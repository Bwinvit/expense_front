import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import useWindowDimension from "hook/useWindowDimension";

const ExpenseBreakdownChart = ({ data }) => {
  const { width } = useWindowDimension();
  const keys = Array.from(
    new Set(
      data.flatMap((item) => Object.keys(item).filter((key) => key !== "date"))
    )
  );

  const showLegendAndAmount = width >= 768;

  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy="date"
        margin={{
          top: 50,
          right: showLegendAndAmount ? 130 : 0,
          bottom: showLegendAndAmount ? 50 : 90,
          left: showLegendAndAmount ? 60 : 0,
        }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: showLegendAndAmount ? 0 : -90,
          legend: showLegendAndAmount ? "date" : "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={
          showLegendAndAmount
            ? {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legendPosition: "middle",
                legendOffset: showLegendAndAmount ? -40 : 0,
              }
            : null
        }
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={
          showLegendAndAmount
            ? [
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
            : []
        }
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default ExpenseBreakdownChart;
