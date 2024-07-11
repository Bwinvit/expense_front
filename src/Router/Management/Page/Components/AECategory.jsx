import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Input, Select, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { ManagementAction } from "Router/Management/store/action";
import { CategoryService } from "api/APIs/category";
import { useManagement } from "Router/Management/store/context";

const AECategoryComponent = styled(Modal)`
  .form {
    margin: 0.5rem 0 0.5rem 0;
  }
`;

const AECategory = ({ visibleAE, handleCloseModalAE }) => {
  const { fetchCategory } = useManagement();
  const { transactionType, category } = useSelector(
    (state) => state.management
  );
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const harvestCategory = _.map(transactionType.data, (item) => ({
    label: item.name,
    value: item._id,
  }));

  const handleChangeName = (e) => {
    dispatch({
      type: ManagementAction.CHANGE_CATEGORY_NAME,
      payload: e.target.value,
    });
  };

  const handleChangeType = (value) => {
    dispatch({
      type: ManagementAction.CHANGE_CATEGORY_TYPE,
      payload: value,
    });
  };

  const handleChangeDescription = (e) => {
    dispatch({
      type: ManagementAction.CHANGE_CATEGORY_DESCRIPTION,
      payload: e.target.value,
    });
  };

  const handleSubmitCategory = async () => {
    setLoading(true);
    const migrateData = {
      name: category.categoryPayload.name,
      type: category.categoryPayload.type,
      description: category.categoryPayload.description,
    };

    try {
      await CategoryService.createCategory(migrateData).then((res) => {
        if (res) {
          handleCloseModalAE();
          message.success("Add category successfully");
          fetchCategory();
        }
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleEditCategory = async () => {
    setLoading(true);
    const migrateData = {
      id: category.registedData._id,
      name: category.categoryPayload.name,
      type: category.categoryPayload.type,
      description: category.categoryPayload.description,
    };
    try {
      await CategoryService.updateCategory(migrateData).then((res) => {
        if (res) {
          handleCloseModalAE();
          message.success("Edit category successfully");
          fetchCategory();
        }
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <AECategoryComponent
      open={visibleAE}
      onCancel={handleCloseModalAE}
      title={
        _.isEmpty(category.registedData) ? "Add new category" : "Edit category"
      }
      footer={[
        <Button key="back" onClick={handleCloseModalAE}>
          Cancle
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={
            _.isEmpty(category.registedData)
              ? handleSubmitCategory
              : handleEditCategory
          }
          loading={loading}
        >
          {_.isEmpty(category.registedData) ? "Add" : "Edit"}
        </Button>,
      ]}
    >
      <div className="form">
        <div className="title">Category Name</div>
        <Input
          placeholder="Enter category name"
          onChange={handleChangeName}
          value={category.categoryPayload.name}
        />
      </div>
      <div className="form">
        <div className="title">Category Name</div>
        <Select
          placeholder="Selecet Transaction Type"
          style={{ width: "100%" }}
          options={harvestCategory}
          onChange={handleChangeType}
          value={category.categoryPayload.type}
        />
      </div>
      <div className="form">
        <div className="title">Description</div>
        <Input.TextArea
          placeholder="Enter Descripotion"
          onChange={handleChangeDescription}
          value={category.categoryPayload.description}
        />
      </div>
    </AECategoryComponent>
  );
};

export default AECategory;
