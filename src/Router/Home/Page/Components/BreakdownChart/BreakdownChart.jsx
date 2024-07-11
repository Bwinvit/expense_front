import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { Typography } from "antd";
import useWindowDimension from "hook/useWindowDimension";
import BreakdownChartDetail from "./BreakdownChartDetail";

const BreakdownChartComponent = styled.div`
  .content {
    display: flex;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

const BreakdownChart = () => {
  const home = useSelector((state) => state.home);
  const common = useSelector((state) => state.common);
  const { width } = useWindowDimension();

  const [sunBurstData, setSunBurstData] = useState(null);

  const executeHarvestData = () => {
    const resHarvest = _.map(common.categoryTree, (data) => ({
      id: data._id,
      name: data.name,
      category: _.map(data.categories, (category) => {
        const categoryTransactions = _.filter(home.expenseRawDate, (item) => {
          return item.category === category._id;
        });

        const totalAmount = _.sumBy(categoryTransactions, "amount");

        return {
          id: category._id,
          name: category.name,
          value: totalAmount > 0 ? totalAmount : 0,
        };
      }).filter((category) => category.value > 0),
    }));

    const transformedData = resHarvest
      .map((type) => ({
        name: type.name,
        children: type.category,
      }))
      .filter((type) => type.children.length > 0);

    const sunburstData = {
      name: "root",
      children: transformedData,
    };

    setSunBurstData(sunburstData);
  };

  useEffect(() => {
    if (!common.transactionType.loading && !_.isEmpty(home.expenseRawDate)) {
      executeHarvestData();
    }
  }, [common.transactionType.loading, home.expenseRawDate]);

  return (
    <BreakdownChartComponent>
      <Typography.Title level={5}>Breakdown Chart</Typography.Title>
      <div className="content">
        <div
          style={{
            height: width * 0.45,
            width: width > 768 ? width * 0.45 : width * 0.95,
            maxWidth: "400px",
          }}
        >
          {sunBurstData && (
            <ResponsiveSunburst
              data={sunBurstData}
              margin={
                width > 768
                  ? { top: 40, right: 20, bottom: 20, left: 50 }
                  : { top: 10, right: 10, bottom: 10, left: 10 }
              }
              id="name"
              value="value"
              cornerRadius={5}
              borderWidth={4}
              arcLabel={(e) => e.id + " (" + e.value + ")"}
              colors={{ scheme: "nivo" }}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              childColor={{
                from: "color",
                modifiers: [["brighter", 0.5]],
              }}
              enableArcLabels={true}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 1.4]],
              }}
            />
          )}
        </div>
        <BreakdownChartDetail />
      </div>
    </BreakdownChartComponent>
  );
};

export default BreakdownChart;
