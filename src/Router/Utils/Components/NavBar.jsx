import React from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiCoinVerticalDuotone } from "react-icons/pi";
import { Avatar, Badge, Button, Popover, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";

import { UserOutlined } from "@ant-design/icons";
import { GiStripedSun } from "react-icons/gi";
import UserPopOver from "./UserPopOver";

const NavComponent = styled.div`
  background-color: #ead474;
  padding: 1rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 100;
  box-shadow: -2px 8px 8px -7px rgba(0, 0, 0, 0.24);

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

const NavBar = ({ dimensions, handleToggleDrawer, handleToggleModal }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <NavComponent>
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
        <div className="name">
          {!_.isEmpty(auth.user) ? auth.user.username : <>Loading</>}
        </div>
        <div className="badge">
          <Popover
            title="Menu"
            placement="bottomLeft"
            trigger="click"
            content={<UserPopOver />}
          >
            <Badge count={_.size(auth.upcomingBills)}>
              <Avatar shape="square" icon={<UserOutlined />} />
            </Badge>
          </Popover>
        </div>
      </div>
    </NavComponent>
  );
};

export default NavBar;
