import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useDimensions from "hook/useComponentDimension";

import { GiHamburgerMenu } from "react-icons/gi";
import { PiCoinVerticalDuotone } from "react-icons/pi";
import { Avatar, Badge, Button, Divider, Drawer, Modal, Popover } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { GiStripedSun } from "react-icons/gi";
import {
  LuSettings,
  LuHome,
  LuLineChart,
  LuOrbit,
  LuGoal,
  LuReceipt,
} from "react-icons/lu";

const LayoutComponent = styled.div``;

const NavComponent = styled.div`
  background-color: #ead474;
  padding: 1rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;

    .hamburger {
      font-size: 1.5rem;
      color: #847447;
      cursor: pointer;
      margin: 0 1.5rem 0 1rem;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: #3e3e3e;
        transition: all 0.2s ease-in-out;
      }
    }

    .logo {
      display: flex;
      align-items: center;
      cursor: pointer;

      .logo_text {
        display: flex;
        color: #594e31;

        .sun {
          color: red;
          margin: 0 0.25rem 0 0.25rem;
        }
      }

      .logo_img {
        width: 50px;
        height: 50px;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .add {
      margin-right: 1rem;
      display: flex;

      .icon {
        color: #f5f5f5;
        transition: all 0.2s ease-in-out;
      }
      &:hover {
        .icon {
          color: red;
          transition: all 0.2s ease-in-out;
        }
      }
    }

    .name {
      margin-right: 1rem;
    }

    .badge {
      cursor: pointer;
    }
  }
`;

const ContainerCompoent = styled.div``;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0 !important;
  }

  .container {
    .nav {
      background-color: #ead474;
      padding: 1.25rem;
      display: flex;
      width: 100%;
      align-items: center;

      .hamburger {
        font-size: 1.5rem;
        color: #847447;
        cursor: pointer;
        margin: 0 1.5rem 0 1rem;
        transition: all 0.2s ease-in-out;

        &:hover {
          color: #3e3e3e;
          transition: all 0.2s ease-in-out;
        }
      }

      .logo {
        display: flex;
        align-items: center;
        cursor: pointer;

        .logo_text {
          display: flex;
          color: #594e31;
          font-family: "Mitr", sans-serif;

          .sun {
            color: red;
            margin: 0 0.25rem 0 0.25rem;
          }
        }

        .logo_img {
          width: 50px;
          height: 50px;
        }
      }
    }

    .nav_content {
      height: calc(100vh - 64px);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .top {
      }

      .bottom {
      }
    }
  }
`;

const ButtonComponent = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0.5rem;
  border-radius: 2.5rem;
  background-color: ${(props) => (props.isActive ? "#e3d3a8" : "#f5f5f5")};
  color: ${(props) => (props.isActive ? "#fff" : "#3e3e3e")};

  .icon {
    font-size: 1.25rem;
    color: ${(props) => (props.isActive ? "#735b1c" : "")};
  }
  .botton_text {
    font-size: 1rem;
  }

  &:hover {
    color: ${(props) => (props.isActive ? "#fff" : "#b3a378")};
    transition: all 0.2s ease-in-out;
  }
`;

const ProtectedLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ref, dimensions] = useDimensions();
  const auth = useSelector((state) => state.auth);

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleClickLogo = () => {
    navigate("/");
  };

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

  const handleNavigate = (path) => {
    handleCloseDrawer();
    setTimeout(() => {
      navigate(`/${path}`);
    }, 300);
  };

  const checkActive = (path) => {
    return location.pathname === `/${path}`;
  };

  return (
    <LayoutComponent>
      <NavComponent ref={ref}>
        <div className="left">
          <GiHamburgerMenu className="hamburger" onClick={handleToggleDrawer} />
          <div className="logo" onClick={handleClickLogo}>
            {dimensions.width > 400 && (
              <div className="logo_text">
                <div>Expense</div>
                <GiStripedSun className="sun" />
                <div>Tracker</div>
              </div>
            )}
          </div>
        </div>
        <div className="right">
          <div className="add">
            <Button
              type="primary"
              shape="round"
              icon={<PiCoinVerticalDuotone className="icon" />}
              onClick={handleToggleModal}
            >
              {dimensions.width < 768 ? "" : "Add Transaction"}
            </Button>
          </div>
          <div className="name">{auth.user.username}</div>
          <div className="badge">
            <Popover
              title="Hello"
              placement="bottomLeft"
              trigger="click"
              content={<div>Content</div>}
            >
              <Badge count={0}>
                <Avatar shape="square" icon={<UserOutlined />} />
              </Badge>
            </Popover>
          </div>
        </div>
      </NavComponent>
      <ContainerCompoent>{children}</ContainerCompoent>
      <StyledDrawer
        placement={"left"}
        closable={false}
        open={isVisibleDrawer}
        onClose={handleCloseDrawer}
        width={
          dimensions.width > 768
            ? dimensions.width * 0.4 > 450
              ? 450
              : dimensions.width * 0.4
            : "100%"
        }
      >
        <div className="container">
          <div className="nav">
            <GiHamburgerMenu
              className="hamburger"
              onClick={handleToggleDrawer}
            />
            <div className="logo" onClick={handleClickLogo}>
              <div className="logo_text">
                <div>Expense</div>
                <GiStripedSun className="sun" />
                <div>Tracker</div>
              </div>
            </div>
          </div>
          <div className="nav_content">
            <div className="top">
              <ButtonComponent
                onClick={() => handleNavigate("")}
                isActive={checkActive("")}
              >
                <LuHome className="icon" />
                <div className="botton_text">Home</div>
              </ButtonComponent>
              <ButtonComponent
                onClick={() => handleNavigate("report-and-analysis")}
                isActive={checkActive("report-and-analysis")}
              >
                <LuLineChart className="icon" />
                <div className="botton_text">Report and Analysis</div>
              </ButtonComponent>
              <ButtonComponent
                onClick={() => handleNavigate("management")}
                isActive={checkActive("management")}
              >
                <LuOrbit className="icon" />
                <div className="botton_text">Management</div>
              </ButtonComponent>
              <ButtonComponent
                onClick={() => handleNavigate("goal")}
                isActive={checkActive("goal")}
              >
                <LuGoal className="icon" />
                <div className="botton_text">Goal</div>
              </ButtonComponent>
              <ButtonComponent
                onClick={() => handleNavigate("transaction")}
                isActive={checkActive("transaction")}
              >
                <LuReceipt className="icon" />
                <div className="botton_text">Transaction</div>
              </ButtonComponent>
            </div>
            <div className="bottom">
              <Divider />
              <ButtonComponent
                onClick={() => handleNavigate("setting")}
                isActive={checkActive("setting")}
              >
                <LuSettings className="icon" />
                <div className="botton_text">Setting</div>
              </ButtonComponent>
            </div>
          </div>
        </div>
      </StyledDrawer>
      <Modal
        title="Hello World"
        open={isVisibleModal}
        onCancel={handleCloseModal}
      >
        Hello World
      </Modal>
    </LayoutComponent>
  );
};

export default ProtectedLayout;
