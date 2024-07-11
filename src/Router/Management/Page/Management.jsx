import React, { useState, useEffect } from "react";
import ManagementProvider from "../store/context";
import styled from "styled-components";
import TransactionType from "./Components/TransactionType";
import Category from "./Components/Category";
import Bill from "./Components/Bill";

const ManagementComponent = styled.div``;

const Management = () => {
  return (
    <ManagementComponent>
      <TransactionType />
      <Category />
      <Bill />
    </ManagementComponent>
  );
};

const ManagementPageWrapper = () => (
  <ManagementProvider>
    <Management />
  </ManagementProvider>
);

export default ManagementPageWrapper;
