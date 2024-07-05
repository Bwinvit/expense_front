import { Statistic } from "antd";
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { homeAction } from "Router/Home/store/action";
import _ from "lodash";

const MonthlyCard = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid #f8f1d3;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) =>
    props.isSelected ? "#f5ebbc" : "transparent"};

  &:hover {
    border: 1px solid #eedd90;
  }
`;

const MonthlyCardComponent = ({ transType }) => {
  const common = useSelector((state) => state.common);
  const home = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: homeAction.CHANGE_TRANSACTION_TYPE_TITLE,
      payload: {
        transactionType: transType.transactionType,
        category: common.category.data,
        transaction: common.transactionType.data,
      },
    });
  };

  const isSelected = _.get(
    _.find(home.monthlySumTransactionType, {
      transactionType: transType.transactionType,
    }),
    "isSelected",
    false
  );

  return (
    <MonthlyCard isSelected={isSelected} onClick={handleClick}>
      <Statistic
        title={transType.transactionType}
        value={transType.amount}
        style={{ color: "white" }}
      />
    </MonthlyCard>
  );
};

export default MonthlyCardComponent;
