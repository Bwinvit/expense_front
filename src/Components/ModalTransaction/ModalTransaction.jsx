import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { FaBahtSign } from "react-icons/fa6";
import { Modal, DatePicker, Select, Divider, Space, Button, Input } from "antd";
import _ from "lodash";
import dayjs from "dayjs";

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

const ModalTransaction = ({ props }) => {
  const {
    isVisibleModal,
    handleClearTransaction,
    handleCloseModal,
    handleChangeDate,
    handleChangeCategory,
    handleChangeAmount,
    handleChangeDescription,
    handleSubmitTransaction,
    optionCategoryTree,
    loading,
    transactionPayload,
  } = props;
  const considerateEdit = !_.isEmpty(transactionPayload) ? true : false;

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
          defaultValue={considerateEdit ? dayjs(transactionPayload.date) : ""}
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
          defaultValue={considerateEdit ? transactionPayload.category.name : ""}
        />
      </div>
      <div className="form">
        <div className="form_label">Amount:</div>
        <Input
          className="form_input"
          suffix={<FaBahtSign />}
          onChange={handleChangeAmount}
          defaultValue={considerateEdit ? transactionPayload.amount : ""}
        />
      </div>
      <div className="form">
        <div className="form_label">Description:</div>
        <Input.TextArea
          className="form_input"
          onChange={handleChangeDescription}
          defaultValue={considerateEdit ? transactionPayload.description : ""}
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

export default ModalTransaction;
