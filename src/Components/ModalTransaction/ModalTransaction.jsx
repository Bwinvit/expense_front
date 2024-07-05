import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { FaBahtSign } from "react-icons/fa6";
import { Modal, DatePicker, Select, Divider, Space, Button, Input } from "antd";

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

const ModalTransaction = (props) => {
  const {
    open,
    handleClearTransaction,
    handleCloseModal,
    handleChangeDate,
    handleChangeCategory,
    handleChangeAmount,
    handleChangeDescription,
    handleSubmitTransaction,
    optionCategoryTree,
    loading,
  } = props;

  return (
    <ModalComponent
      title="Add Transaction"
      open={open}
      footer={null}
      onCancel={() => {
        handleClearTransaction();
        handleCloseModal();
      }}
    >
      <div className="form">
        <div className="form_label">Date:</div>
        <DatePicker className="form_input" onChange={handleChangeDate} />
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
        />
      </div>
      <div className="form">
        <div className="form_label">Amount:</div>
        <Input
          className="form_input"
          suffix={<FaBahtSign />}
          onChange={handleChangeAmount}
        />
      </div>
      <div className="form">
        <div className="form_label">Description:</div>
        <Input.TextArea
          className="form_input"
          onChange={handleChangeDescription}
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
