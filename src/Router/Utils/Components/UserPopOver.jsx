import React, { useState } from "react";
import { Divider } from "antd";
import styled from "styled-components";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "Router/Auth/store/context";
import _ from "lodash";
import dayjs from "dayjs";
import { IoIosNotifications } from "react-icons/io";
import ModalConfirmPayment from "./ModalConfirmPayment";
import { AuthAction } from "Router/Auth/store/action";

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
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const handleToggleVisible = (bill) => {
    dispatch({ type: AuthAction.REGIS_BILL, payload: bill });
    setVisibleConfirm((prev) => !prev);
  };

  const handleCloseModal = () => {
    dispatch({ type: AuthAction.REMOVE_BILL });
    setVisibleConfirm(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <UserPopOverComponent>
      {!_.isEmpty(auth.upcomingBills) && (
        <div className="menu_com">
          <Divider style={{ margin: "0 0 .5rem" }} />
          <div className="title">Notification</div>
          {_.map(auth.upcomingBills, (bill, index) => (
            <div
              className="action_com"
              key={index}
              onClick={() => handleToggleVisible(bill)}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                className="left"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IoIosNotifications
                  className="icon"
                  style={{ color: "#c76363" }}
                />
                <div className="text">{bill.description}</div>
              </div>
              <div className="text" style={{ fontSize: "0.65rem" }}>
                {dayjs(bill.dueDate).format("DD/MM")}
              </div>
            </div>
          ))}
        </div>
      )}
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
      <ModalConfirmPayment
        visibleConfirm={visibleConfirm}
        handleCloseModal={handleCloseModal}
      />
    </UserPopOverComponent>
  );
};

export default UserPopOver;
