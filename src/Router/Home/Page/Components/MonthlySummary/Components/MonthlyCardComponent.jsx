import { Statistic } from "antd";
import React from "react";
import styled from "styled-components";

const MonthlyCard = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid #f8f1d3;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid #eedd90;
  }
`;

const MonthlyCardComponent = ({ transType }) => {
  return (
    <MonthlyCard>
      <Statistic title={transType.transactionType} value={transType.amount} />
    </MonthlyCard>
  );
};

export default MonthlyCardComponent;
