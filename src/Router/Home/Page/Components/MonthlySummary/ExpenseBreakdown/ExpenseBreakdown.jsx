import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ExpenseBreakdownChart from "./Components/ExpenseBreakdownChart";
import _ from "lodash";

const ExpenseBreakdownComponent = styled.div`
  margin-top: 1.5rem;
`;

const ExpenseBreakdown = () => {
  const home = useSelector((state) => state.home);
  const common = useSelector((state) => state.common);
  const auth = useSelector((state) => state.auth);

  return (
    <ExpenseBreakdownComponent>
      <div className="title">Expense Breakdown</div>
      <div className="filter"></div>
      <div className="content">
        {!_.isEmpty(home.expenseBreakdown) && (
          <ExpenseBreakdownChart data={home.expenseBreakdownInUse} />
        )}
      </div>
    </ExpenseBreakdownComponent>
  );
};

export default ExpenseBreakdown;
