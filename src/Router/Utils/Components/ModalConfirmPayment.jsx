import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal, Input, message } from "antd";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { BillService } from "api/APIs/bill";
import { useAuth } from "Router/Auth/store/context";

const ModalConfirmPaymentComponent = styled(Modal)``;

const ModalConfirmPayment = ({ visibleConfirm, handleCloseModal }) => {
  const { fetchUserProfile } = useAuth();
  const { billInAction } = useSelector((state) => state.auth);

  const [amount, setAmount] = useState(billInAction.amount);
  const [loading, setLoading] = useState(false);

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handlePayBill = async () => {
    setLoading(true);
    const migrateData = {
      id: billInAction._id,
      paidAmount: billInAction.amount ? billInAction.amount : amount,
    };

    await BillService.payBill(migrateData).then((res) => {
      if (res) {
        message.success("Bill Payment Successful");
        handleCloseModal();
        fetchUserProfile();
      } else {
        message.error("Bill Payment Failed");
        setLoading(false);
      }
    });
    setLoading(false);
  };

  return (
    <ModalConfirmPaymentComponent
      open={visibleConfirm}
      onCancel={handleCloseModal}
      title="Confirm Payment"
      footer={[
        <Button onClick={handleCloseModal}>Close</Button>,
        <Button type="primary" loading={loading} onClick={handlePayBill}>
          Confirm
        </Button>,
      ]}
    >
      <div>
        You already paid{" "}
        <span style={{ fontWeight: "bold" }}>{billInAction.description}</span>{" "}
        on{" "}
        <span style={{ fontWeight: "bold" }}>{dayjs().format("DD/MM/YY")}</span>{" "}
        amount{" "}
        {billInAction.amount ? (
          <span style={{ fontWeight: "bold" }}>{billInAction.amount}</span>
        ) : (
          <Input
            style={{ marginTop: "1rem" }}
            onChange={handleChangeAmount}
            value={amount}
          />
        )}
      </div>
    </ModalConfirmPaymentComponent>
  );
};

export default ModalConfirmPayment;
