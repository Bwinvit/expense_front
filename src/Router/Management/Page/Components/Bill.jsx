import React from "react";
import styled from "styled-components";
import { Table, Tag, Typography, Popover, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import _ from "lodash";
import { ControlOutlined } from "@ant-design/icons";
import { ManagementAction } from "Router/Management/store/action";

const { Title } = Typography;

const BillComponent = styled.div`
  margin-top: 1rem;
`;

const ContentComponent = styled.div`
  display: flex;
  gap: 1rem;
`;

const Bill = () => {
  const { transactionType, category, bill } = useSelector(
    (state) => state.management
  );
  const dispatch = useDispatch();

  const handleRegist = (record) => {
    dispatch({
      type: ManagementAction.REGISTER_BILL,
      payload: record,
    });
  };

  const content = (
    <ContentComponent>
      <Button
        style={{ width: "100%" }}
        //   onClick={handleToggleEditModal}
      >
        Edit
      </Button>
      <Button
        type="primary"
        style={{ width: "100%" }}
        // onClick={handleClickDelete}
      >
        Delete
      </Button>
    </ContentComponent>
  );

  const columns = [
    {
      title: "Due Date",
      dataIndex: "dueDate",
      render: (data) => dayjs(data).format("DD/MM/YYYY"),
    },
    {
      title: "Bill",
      dataIndex: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      render: (data) => (
        <div>
          {_.get(
            _.find(category.data, (type) => type._id === data),
            "name"
          )}
        </div>
      ),
    },
    {
      title: "Recurring Period",
      render: (data) =>
        data.isRecurring ? <div>{data.recurrencePeriod}</div> : null,
    },
    {
      title: "Paid",
      dataIndex: "isPaid",
      render: (data) =>
        data ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
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
            onClick={() => handleRegist(record)}
          >
            <ControlOutlined style={{ fontSize: "1.75rem" }} />
          </Popover>
        ) : null,
    },
  ];

  return (
    <BillComponent>
      <Title level={5}>Bill</Title>
      <Table
        dataSource={bill.data}
        columns={columns}
        scroll={{
          x: 1100,
        }}
      />
    </BillComponent>
  );
};

export default Bill;
