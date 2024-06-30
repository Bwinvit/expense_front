import { Divider } from "antd";
import React from "react";
import styled from "styled-components";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "Router/Auth/store/context";

const UserPopOverComponent = styled.div`
  .menu_com {
    .title {
      font-size: 0.65rem;
      font-weight: 500;
      color: #a19678;
    }
    .action_com {
      display: flex;
      align-items: center;
      padding: 0.15rem;
      cursor: pointer;

      .icon {
        margin-right: 0.5rem;
      }

      &:hover {
        background-color: #847447;
        color: #f5f5f5;
        transition: all 0.2s ease-in-out;
      }
    }
  }
`;

const UserPopOver = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <UserPopOverComponent>
      <div className="menu_com">
        <Divider style={{ margin: "0 0 .5rem" }} />
        <div className="title">Notification</div>
      </div>
      <div className="menu_com">
        <Divider style={{ margin: "0 0 .5rem" }} />
        <div className="title">User</div>
        <div className="action_com" onClick={() => handleNavigate("/setting")}>
          <IoSettingsOutline className="icon" />
          <div className="text">Setting</div>
        </div>
        <div className="action_com" onClick={handleLogout}>
          <MdOutlineLogout className="icon" />
          <div className="text">Logout</div>
        </div>
      </div>
    </UserPopOverComponent>
  );
};

export default UserPopOver;
