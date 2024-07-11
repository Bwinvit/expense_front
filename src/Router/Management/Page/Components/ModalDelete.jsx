import { Modal, Button } from "antd";
import React from "react";
import styled from "styled-components";

const ModalDeleteComponent = styled(Modal)``;

const ModalDelete = ({
  visibleDelete,
  handleCloseModalDelete,
  title,
  content,
  name,
  execute,
  loading,
}) => {
  return (
    <ModalDeleteComponent
      open={visibleDelete}
      onCancel={handleCloseModalDelete}
      title={title}
      footer={[
        <Button key="cancle" onClick={handleCloseModalDelete}>
          Cancle
        </Button>,
        <Button key="delete" type="primary" onClick={execute} loading={loading}>
          Delete
        </Button>,
      ]}
    >
      <div>
        {content}
        <span style={{ fontWeight: "bold" }}>{name}</span> ?
      </div>
    </ModalDeleteComponent>
  );
};

export default ModalDelete;
