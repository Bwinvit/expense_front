import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "Router/Auth/store/context";
import TransactionProvider from "../store/context";
import Filter from "./Components/Filter/Filter";
import { Modal, Typography } from "antd";
import { useSelector } from "react-redux";
import TransactionDisplay from "./Components/TransactionDisplay/TransactionDisplay";
import _ from "lodash";
import ModalDeleteTransaction from "./Components/Modal/ModalDeleteTransaction";

const { Title } = Typography;

const TransactionComponent = styled.div``;

const Transaction = () => {
  const { setPageHeader } = useAuth();
  const transaction = useSelector((state) => state.transaction);

  useEffect(() => {
    setPageHeader("Transaction");
  }, []);

  return (
    <TransactionComponent>
      <Title level={5}>Transaction</Title>
      <Filter />
      {!_.isEmpty(transaction.transactionData) && <TransactionDisplay />}
      <ModalDeleteTransaction />
    </TransactionComponent>
  );
};

const TransactionPageWrapper = () => (
  <TransactionProvider>
    <Transaction />
  </TransactionProvider>
);

export default TransactionPageWrapper;
