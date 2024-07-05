import React, { useEffect } from "react";
import styled from "styled-components";
import { DatePicker, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { transactionAction } from "Router/Transaction/store/action";

const FilterComponent = styled.div`
  display: flex;
  justify-content: flex-end;
  .filter {
    margin: 0 0.5rem 0 0;

    .select {
      width: 15rem;
    }
  }
`;

const Filter = () => {
  const dispatch = useDispatch();
  const common = useSelector((state) => state.common);

  const optionCategory = () => {
    const rearrangeData = _.map(common.categoryTree, (transactionType) => ({
      label: transactionType.name,
      title: transactionType.name,
      options: _.map(transactionType.categories, (cate) => ({
        label: cate.name,
        value: cate._id,
      })),
    }));

    return rearrangeData;
  };

  const handleChangeDate = (value, dateString) => {
    dispatch({
      type: transactionAction.CHANGE_DATE,
      payload: { start: dateString[0], end: dateString[1] },
    });
  };

  const handleChangeCategory = (value) => {
    dispatch({
      type: transactionAction.CHANGE_CATEGORY,
      payload: value,
    });
  };

  return (
    <FilterComponent>
      <div className="filter">
        <DatePicker.RangePicker
          placeholder={["This day", "Till Now"]}
          allowEmpty={[true, true]}
          onChange={handleChangeDate}
        />
      </div>
      <div className="filter">
        <Select
          className="select"
          mode="multiple"
          dropdownRender={(option) => <>{option}</>}
          options={optionCategory()}
          placeholder="Please Select Category"
          onChange={handleChangeCategory}
        />
      </div>
    </FilterComponent>
  );
};

export default Filter;
