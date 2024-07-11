import React, { createContext, useContext, useEffect } from "react";
import styled from "styled-components";

const BreakdownChartComponent = styled.div`
  background-color: red;
  width: 100%;
  padding: 1.5rem;
`;

const BreakdownChartDetail = () => {
  return (
    <BreakdownChartComponent>
      <div>Breakdown Chart</div>
    </BreakdownChartComponent>
  );
};

export default BreakdownChartDetail;
