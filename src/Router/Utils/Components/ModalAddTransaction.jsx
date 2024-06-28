import React from "react";
import styled from "styled-components";
import { Modal, DatePicker, Select, Divider, Space, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FaBahtSign } from "react-icons/fa6";

const ModalComponent = styled(Modal)`
  .form {
    margin: 0.5rem 0 0.5rem 0;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
`;

const ModalAddTransaction = ({
  isVisibleModal,
  handleCloseModal,
  optionCategoryTree,
}) => {
  return (
    <ModalComponent
      title="Add Transaction"
      open={isVisibleModal}
      onCancel={handleCloseModal}
    >
      <div className="form">
        <div className="form_label">Date:</div>
        <DatePicker className="form_input" />
      </div>
      <div className="form">
        <div className="form_label">Category:</div>
        <Select
          className="form_input"
          dropdownRender={(option) => (
            <>
              {option}
              <Divider />
              <Space style={{ padding: "0 8px 4px" }}>
                <Button icon={<PlusOutlined />}>Add Cetegory</Button>
              </Space>
            </>
          )}
          options={optionCategoryTree}
        />
      </div>
      <div className="form">
        <div className="form_label">Amount:</div>
        <Input className="form_input" suffix={<FaBahtSign />} />
      </div>
      <div className="form">
        <div className="form_label">Description:</div>
        <Input.TextArea className="form_input" />
      </div>
    </ModalComponent>
  );
};

export default ModalAddTransaction;
