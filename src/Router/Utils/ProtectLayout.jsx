import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import useDimensions from "hook/useComponentDimension";
import _ from "lodash";

import ModalAddTransaction from "./Components/ModalAddTransaction";
import DrawerMenu from "./Components/DrawerMenu";
import NavBar from "./Components/NavBar";

const LayoutComponent = styled.div``;

const ContainerCompoent = styled.div`
  max-width: 1200px;
  margin: 1rem 4rem 0 4rem;
`;

const ProtectedLayout = ({ children }) => {
  const [ref, dimensions] = useDimensions();
  const { categoryTree } = useSelector((state) => state.common);

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [optionCategoryTree, setOptionCategoryTree] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(categoryTree)) {
      optionCategory();
    }
  }, [categoryTree]);

  const handleToggleDrawer = () => {
    setIsVisibleDrawer((prev) => !prev);
  };

  const handleCloseDrawer = () => {
    setIsVisibleDrawer(false);
  };

  const handleToggleModal = () => {
    setIsVisibleModal((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsVisibleModal(false);
  };

  const optionCategory = () => {
    const rearrangeData = _.map(categoryTree, (transactionType) => ({
      label: transactionType.name,
      title: transactionType.name,
      options: _.map(transactionType.categories, (cate) => ({
        label: cate.name,
        value: cate._id,
      })),
    }));

    setOptionCategoryTree(rearrangeData);
  };

  return (
    <LayoutComponent ref={ref}>
      <NavBar
        dimensions={dimensions}
        handleToggleDrawer={handleToggleDrawer}
        handleToggleModal={handleToggleModal}
      />
      <ContainerCompoent>{children}</ContainerCompoent>
      <DrawerMenu
        dimensions={dimensions}
        isVisibleDrawer={isVisibleDrawer}
        handleCloseDrawer={handleCloseDrawer}
        handleToggleDrawer={handleToggleDrawer}
      />
      <ModalAddTransaction
        isVisibleModal={isVisibleModal}
        handleCloseModal={handleCloseModal}
        optionCategoryTree={optionCategoryTree}
      />
    </LayoutComponent>
  );
};

export default ProtectedLayout;
