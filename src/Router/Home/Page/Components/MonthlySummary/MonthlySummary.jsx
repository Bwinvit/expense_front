import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import MonthlyCardComponent from "./Components/MonthlyCardComponent";

const { Title } = Typography;

const MonthlySummaryComponent = styled.div`
  .card_container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
    width: 100%;
  }
`;

const MonthlySummary = () => {
  const home = useSelector((state) => state.home);
  const dispatch = useDispatch();

  return (
    <MonthlySummaryComponent>
      <Title level={5}>Monthly Summary</Title>
      <div className="card_container">
        {_.map(home.monthlySum, (transType) => (
          <MonthlyCardComponent transType={transType} />
        ))}
      </div>
    </MonthlySummaryComponent>
  );
};

export default MonthlySummary;
