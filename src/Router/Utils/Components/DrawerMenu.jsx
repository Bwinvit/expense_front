import React from "react";
import styled from "styled-components";
import { Drawer, Divider } from "antd";
import {
  LuSettings,
  LuHome,
  LuLineChart,
  LuOrbit,
  LuGoal,
  LuReceipt,
} from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiStripedSun } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";

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

const DrawerMenu = ({
  dimensions,
  isVisibleDrawer,
  handleCloseDrawer,
  handleToggleDrawer,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

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
          <GiHamburgerMenu className="hamburger" onClick={handleToggleDrawer} />
          <div className="logo">
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
  );
};

export default DrawerMenu;
