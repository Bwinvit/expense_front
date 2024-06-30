import React, { useState } from "react";
import styled from "styled-components";
import {
  Modal,
  DatePicker,
  Select,
  Divider,
  Space,
  Button,
  Input,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaBahtSign } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { CommonAction } from "../../Store/action.js";
import { TransactionService } from "api/APIs/transaction.js";
import _ from "lodash";

const ModalComponent = styled(Modal)`
  .form {
    margin: 0.5rem 0 0.5rem 0;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }

  .button_group {
    margin: 0.5rem 0 0.5rem 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .button {
      margin: 0 0.5rem 0 0;
    }
  }
`;

const ModalAddTransaction = ({
  isVisibleModal,
  handleCloseModal,
  optionCategoryTree,
}) => {
  const dispatch = useDispatch();
  const common = useSelector((state) => state.common);

  const [loading, setLoading] = useState(false);

  const handleClearTransaction = () => {
    dispatch({
      type: CommonAction.CLEAR_TRANSACTION_DATA,
    });
  };

  const handleChangeDate = (date, dateString) => {
    dispatch({
      type: CommonAction.CHANGE_TRANSACTION_DATA_DATE,
      payload: new Date(dateString).getTime() / 1000,
    });
  };

  const handleChangeCategory = (value) => {
    dispatch({
      type: CommonAction.CHANGE_TRANSACTION_DATA_CATEGORY,
      payload: value,
    });
  };

  const handleChangeAmount = (e) => {
    dispatch({
      type: CommonAction.CHANGE_TRANSACTION_DATA_AMOUNT,
      payload: e.target.value,
    });
  };

  const handleChangeDescription = (e) => {
    dispatch({
      type: CommonAction.CHANGE_TRANSACTION_DATA_DESCRIPTION,
      payload: e.target.value,
    });
  };

  const handleSubmitTransaction = () => {
    setLoading(true);
    validationForm();
  };

  const validationForm = () => {
    const errorArray = {};

    if (!common.transactionData.date) {
      errorArray.date = "Date is required";
    }
    if (!common.transactionData.categoryId) {
      errorArray.categoryId = "Category is required";
    }
    if (!common.transactionData.amount) {
      errorArray.amount = "Amount is required";
    } else if (common.transactionData.amount <= 0) {
      errorArray.amount = "Amount must be greater than 0";
    }

    if (_.isEmpty(errorArray)) {
      handlePostTransaction();
    } else {
      _.forEach(errorArray, (value, key) => {
        message.error(value);
      });
      setLoading(false);
    }
  };

  const handlePostTransaction = async () => {
    const migrateData = {
      date: common.transactionData.date,
      categoryId: common.transactionData.categoryId,
      amount: common.transactionData.amount,
      description: common.transactionData.description,
    };

    const resTransaction = await TransactionService.postTransaction(
      migrateData
    );
    setLoading(false);
  };

  return (
    <ModalComponent
      title="Add Transaction"
      open={isVisibleModal}
      footer={null}
      onCancel={() => {
        handleClearTransaction();
        handleCloseModal();
      }}
    >
      <div className="form">
        <div className="form_label">Date:</div>
        <DatePicker
          className="form_input"
          onChange={handleChangeDate}
          selected={
            common.transactionData.date
              ? new Date(common.transactionData.date * 1000)
              : null
          }
        />
      </div>
      <div className="form">
        <div className="form_label">Category:</div>
        <Select
          className="form_input"
          dropdownRender={(option) => (
            <>
              {option}
              <Divider />
              <Space style={{ padding: "0 8px 4px" }}>
                <Button icon={<PlusOutlined />}>Add Cetegory</Button>
              </Space>
            </>
          )}
          options={optionCategoryTree}
          onChange={handleChangeCategory}
          value={
            common.transactionData.categoryId
              ? common.transactionData.categoryId
              : null
          }
        />
      </div>
      <div className="form">
        <div className="form_label">Amount:</div>
        <Input
          className="form_input"
          suffix={<FaBahtSign />}
          onChange={handleChangeAmount}
          value={common.transactionData.amount}
        />
      </div>
      <div className="form">
        <div className="form_label">Description:</div>
        <Input.TextArea
          className="form_input"
          onChange={handleChangeDescription}
          value={common.transactionData.description}
        />
      </div>
      <div className="button_group">
        <Button
          onClick={() => {
            handleClearTransaction();
            handleCloseModal();
          }}
          className="button"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          loading={loading}
          onClick={handleSubmitTransaction}
          className="button_primary"
        >
          Submit
        </Button>
      </div>
    </ModalComponent>
  );
};

export default ModalAddTransaction;
