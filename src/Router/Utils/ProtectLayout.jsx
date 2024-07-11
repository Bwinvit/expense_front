import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import useDimensions from "hook/useComponentDimension";
import _ from "lodash";
import useWindowDimension from "hook/useWindowDimension";

import ModalAddTransaction from "./Components/ModalAddTransaction";
import DrawerMenu from "./Components/DrawerMenu";
import NavBar from "./Components/NavBar";

const LayoutComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContainerCompoent = styled.div`
  padding: 5rem 2rem;
  width: 100%;
  max-width: calc(1200px + 2rem);
`;

const ProtectedLayout = ({ children }) => {
  const { width } = useWindowDimension();
  const [ref, dimensions] = useDimensions();

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleToggleDrawer = () => {
    setIsVisibleDrawer((prev) => !prev);
  };

  const handleCloseDrawer = () => {
    setIsVisibleDrawer(false);
  };

  const handleToggleModal = () => {
    setIsVisibleModal((prev) => !prev);
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
        setIsVisibleModal={setIsVisibleModal}
      />
    </LayoutComponent>
  );
};

export default ProtectedLayout;
