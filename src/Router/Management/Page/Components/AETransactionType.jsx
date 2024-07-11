import React, { Component, useEffect } from "react";
import styled from "styled-components";
import { Button, Input, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { ManagementAction } from "Router/Management/store/action";
import { TransactionTypeService } from "api/APIs/transactionType";
import { useManagement } from "Router/Management/store/context";

const AETransactionTypeComponent = styled(Modal)``;

const AETransactionType = (props) => {
  const { visibleAE, handleClose } = props;
  const { transactionType } = useSelector((state) => state.management);
  const { fetchTransactionType } = useManagement();
  const dispatch = useDispatch();

  const handleChangeName = (e) => {
    dispatch({
      type: ManagementAction.CHANGE_TRANSACTION_TYPE_NAME,
      payload: e.target.value,
    });
  };

  const handleChangeDescription = (e) => {
    dispatch({
      type: ManagementAction.CHANGE_TRANSACTION_TYPE_DESCRIPTION,
      payload: e.target.value,
    });
  };

  const handleCreateTransactionType = async () => {
    const migrateData = {
      name: transactionType.transactionTypePayload.name,
      description: transactionType.transactionTypePayload.description,
    };

    if (_.isEmpty(migrateData.name) || _.isEmpty(migrateData.description)) {
      message.error("Please fill all field");
      return;
    } else {
      try {
        await TransactionTypeService.postTransactionType(migrateData).then(
          (res) => {
            if (res) {
              fetchTransactionType();
              message.success("Create Transaction Type Successfully");
              handleClose();
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditTransactionType = async () => {
    const migrateData = {
      id: transactionType.registedData._id,
      name: transactionType.transactionTypePayload.name,
      description: transactionType.transactionTypePayload.description,
    };

    if (_.isEmpty(migrateData.name) || _.isEmpty(migrateData.description)) {
      message.error("Please fill all field");
      return;
    } else {
      try {
        await TransactionTypeService.putTransactionType(migrateData).then(
          (res) => {
            if (res) {
              fetchTransactionType();
              message.success("Edit Transaction Type Successfully");
              handleClose();
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <AETransactionTypeComponent
      open={visibleAE}
      onCancel={handleClose}
      title="Add Transaction Type"
      footer={[
        <Button onClick={handleClose}>Cancle</Button>,
        <Button
          type="primary"
          onClick={() =>
            _.isEmpty(transactionType.registedData)
              ? handleCreateTransactionType()
              : handleEditTransactionType()
          }
        >
          Add
        </Button>,
      ]}
    >
      <div className="name">
        <div className="title">Name</div>
        <Input
          type="text"
          placeholder="Name"
          onChange={handleChangeName}
          value={transactionType.transactionTypePayload.name}
        />
      </div>
      <div className="description">
        <div className="title">Description</div>
        <Input.TextArea
          placeholder="Description"
          onChange={handleChangeDescription}
          value={transactionType.transactionTypePayload.description}
        />
      </div>
    </AETransactionTypeComponent>
  );
};

export default AETransactionType;
