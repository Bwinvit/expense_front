import React, { useEffect, useState } from "react";
import { Button, Popover, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { transactionAction } from "Router/Transaction/store/action";
import styled from "styled-components";
import dayjs from "dayjs";
import { ControlOutlined } from "@ant-design/icons";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";

const TransactionDisplayComponent = styled.div`
  margin-top: 3rem;
`;

const ContentComponent = styled.div`
  display: flex;
  gap: 1rem;
`;

const TransactionDisplay = () => {
  const transaction = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleToggleEditModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  const handleClickDelete = () => {
    dispatch({ type: transactionAction.CHANGE_STATE_MODAL_DELETE });
  };

  const handleRegistTrans = (data) => {
    dispatch({
      type: transactionAction.REGISTER_TRANSACTION_IN_ACTION,
      payload: data._id,
    });
  };

  const content = (
    <ContentComponent>
      <Button style={{ width: "100%" }} onClick={handleToggleEditModal}>
        Edit
      </Button>
      <Button
        type="primary"
        style={{ width: "100%" }}
        onClick={handleClickDelete}
      >
        Delete
      </Button>
    </ContentComponent>
  );

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 35,
      fixed: "left",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Category",
      key: "category",
      width: 60,
      render: (data) => (
        <div>
          <div>
            {data.category.name} / {data.type.name}
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 50,
      render: (text) => (
        <div>
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 100,
      render: (text) => (
        <div>
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      width: 15,
      fixed: "right",
      render: (text, record) => (
        <Popover
          content={content}
          trigger="click"
          placement="rightBottom"
          onClick={() => handleRegistTrans(record)}
        >
          <ControlOutlined style={{ fontSize: "1.75rem" }} />
        </Popover>
      ),
    },
  ];

  return (
    <TransactionDisplayComponent>
      <Table
        columns={columns}
        dataSource={transaction.transactionData}
        pagination={false}
        virtual
        scroll={{
          x: 1100,
        }}
      />
      <ModalEditTransaction
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
      />
    </TransactionDisplayComponent>
  );
};

export default TransactionDisplay;
