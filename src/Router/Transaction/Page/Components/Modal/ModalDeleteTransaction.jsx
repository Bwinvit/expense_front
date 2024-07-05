import { Button, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { transactionAction } from "Router/Transaction/store/action";
import { TransactionService } from "api/APIs/transaction";
import { useTransaction } from "Router/Transaction/store/context";

const ModalDeleteTransactionComponent = styled(Modal)`
  .warning {
    color: #ead474;
  }
`;

const ModalDeleteTransaction = () => {
  const dispatch = useDispatch();
  const { fetchTransactions } = useTransaction();
  const transaction = useSelector((state) => state.transaction);

  const { isVisibleDeleteModal } = useSelector((state) => state.transaction);

  const [isLoading, setIsLoading] = useState(false);

  const handleClickDelete = () => {
    dispatch({ type: transactionAction.CHANGE_STATE_MODAL_DELETE });
  };

  const handleDeleteTransaction = async () => {
    setIsLoading(true);

    const migrateData = transaction.transactionInAction;
    await TransactionService.deleteTransaction(migrateData).then((res) => {
      if (res.status === 200) {
        message.success("Transaction deleted successfully");
      } else {
        message.error("Something went wrong, please try again later");
      }
    });
    fetchTransactions();
    setIsLoading(false);
    handleClickDelete();
  };

  return (
    <ModalDeleteTransactionComponent
      open={isVisibleDeleteModal}
      onCancel={handleClickDelete}
      title="Are you sure you want to delete this transaction?"
      onOk={handleDeleteTransaction}
      footer={[
        <Button className="btn-cancel" onClick={handleClickDelete}>
          Cancel
        </Button>,
        <Button
          type="primary"
          className="btn-delete"
          onClick={handleDeleteTransaction}
          disabled={isLoading}
          loading={isLoading}
        >
          Ok
        </Button>,
      ]}
    >
      <div className="warning">⚠️you will not be able to recover it.⚠️</div>
    </ModalDeleteTransactionComponent>
  );
};

export default ModalDeleteTransaction;
