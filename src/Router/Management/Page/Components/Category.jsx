import React, { useState } from "react";
import styled from "styled-components";
import { Table, Typography, Popover, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import _, { set } from "lodash";
import { ControlOutlined } from "@ant-design/icons";
import { ManagementAction } from "Router/Management/store/action";
import { useManagement } from "Router/Management/store/context";
import ModalDelete from "./ModalDelete";
import { CategoryService } from "api/APIs/category";
import AECategory from "./AECategory";

const { Title } = Typography;

const CategoryComponent = styled.div`
  margin-top: 1rem;
  .title {
    display: flex;
    justify-content: space-between;
  }
`;

const ContentComponent = styled.div`
  display: flex;
  gap: 1rem;
`;

const Category = () => {
  const { fetchCategory } = useManagement();
  const { transactionType, category } = useSelector(
    (state) => state.management
  );
  const dispatch = useDispatch();

  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleAE, setVisibleAE] = useState(false);
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState({});

  const handleRegist = () => {
    dispatch({
      type: ManagementAction.REGISTER_CATEGORY,
      payload: record,
    });
  };

  const handleClickDelete = () => {
    handleRegist();
    setVisibleDelete(true);
  };

  const handleCloseModalDelete = () => {
    dispatch({
      type: ManagementAction.CLEAR_CATEGORY,
    });
    setVisibleDelete(false);
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    const migrateData = category.registedData._id;
    await CategoryService.deleteCategory(migrateData).then((res) => {
      if (res.message) {
        message.success(res.message);
        handleCloseModalDelete();
        fetchCategory();
      } else {
        message.error(res.error);
      }
    });
    setLoading(false);
  };

  const handleClickAE = () => {
    setVisibleAE((prev) => !prev);
  };

  const handleCloseModalAE = () => {
    dispatch({
      type: ManagementAction.CLEAR_CATEGORY,
    });
    setVisibleAE(false);
  };

  const handleToggleEditModal = () => {
    setVisibleAE(true);
  };

  const content = (
    <ContentComponent>
      <Button
        style={{ width: "100%" }}
        onClick={() => {
          handleRegist();
          handleToggleEditModal();
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
      title: "Category",
      dataIndex: "name",
    },
    {
      title: "Transaction Type",
      dataIndex: "type",
      render: (data) => (
        <div>
          {_.get(
            _.find(transactionType.data, (type) => type._id === data),
            "name"
          )}
        </div>
      ),
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
    <CategoryComponent>
      <div className="title">
        <Title level={5}>Category</Title>
        <Button size="small" onClick={handleClickAE}>
          Add
        </Button>
      </div>

      <Table
        dataSource={category.data}
        columns={columns}
        scroll={{
          x: 1100,
        }}
      />
      <ModalDelete
        visibleDelete={visibleDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        title={"Delete Category?"}
        content={`Are you sure you want to delete `}
        name={category.registedData.name}
        execute={handleDeleteCategory}
        loading={loading}
      />
      <AECategory
        visibleAE={visibleAE}
        handleCloseModalAE={handleCloseModalAE}
      />
    </CategoryComponent>
  );
};

export default Category;
