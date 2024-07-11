import React, { useState } from "react";
import styled from "styled-components";
import { Table, Typography, Popover, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ControlOutlined } from "@ant-design/icons";
import _, { set } from "lodash";
import { ManagementAction } from "Router/Management/store/action";
import ModalDelete from "./ModalDelete";
import { TransactionTypeService } from "api/APIs/transactionType";
import { useManagement } from "Router/Management/store/context";
import AETransactionType from "./AETransactionType";

const { Title } = Typography;

const TransactionTypeComponent = styled.div`
  .title {
    display: flex;
    justify-content: space-between;
  }
`;

const ContentComponent = styled.div`
  display: flex;
  gap: 1rem;
`;

const TransactionType = () => {
  const { fetchTransactionType } = useManagement();
  const { transactionType } = useSelector((state) => state.management);
  const dispatch = useDispatch();

  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleAE, setVisibleAE] = useState(false);
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState({});

  const handleRegist = () => {
    dispatch({
      type: ManagementAction.REGISTER_TRANSACTION_TYPE,
      payload: record,
    });
  };

  const handleClickDelete = () => {
    handleRegist();
    setVisibleDelete(true);
  };

  const handleCloseModalDelete = () => {
    dispatch({
      type: ManagementAction.CLEAR_TRANSACTION_TYPE,
    });
    setVisibleDelete(false);
  };

  const handleDeleteTransactionType = async () => {
    setLoading(true);
    const migrateData = transactionType.registedData._id;
    await TransactionTypeService.deleteTransactionType({
      id: migrateData,
    }).then((res) => {
      if (res.message) {
        message.success(res.message);
        handleCloseModalDelete();
        fetchTransactionType();
      } else {
        message.error(res.error);
      }
    });
    setLoading(false);
  };

  const handleClickAE = () => {
    setVisibleAE(true);
  };

  const handleCloseAE = () => {
    dispatch({
      type: ManagementAction.CLEAR_TRANSACTION_TYPE,
    });
    setVisibleAE(false);
  };

  const content = (
    <ContentComponent>
      <Button
        style={{ width: "100%" }}
        onClick={() => {
          handleRegist();
          handleClickAE();
        }}
      >
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
      title: "Transaction Type",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "action",
      width: "8%",
      fixed: "right",
      render: (text, record) =>
        record.userId ? (
          <Popover
            content={content}
            trigger="click"
            placement="rightBottom"
            onClick={() => setRecord(record)}
          >
            <ControlOutlined style={{ fontSize: "1.75rem" }} />
          </Popover>
        ) : null,
    },
  ];

  return (
    <TransactionTypeComponent>
      <div className="title">
        <Title level={5}>Transaction Type</Title>
        <Button size="small" onClick={handleClickAE}>
          Add
        </Button>
      </div>
      <Table
        dataSource={transactionType.data}
        columns={columns}
        scroll={{
          x: 1100,
        }}
      />
      <ModalDelete
        visibleDelete={visibleDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        title={"Delete Transaction Type?"}
        content={`Are you sure you want to delete `}
        name={transactionType.registedData.name}
        execute={handleDeleteTransactionType}
        loading={loading}
      />
      <AETransactionType visibleAE={visibleAE} handleClose={handleCloseAE} />
    </TransactionTypeComponent>
  );
};

export default TransactionType;
