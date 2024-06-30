import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedLayout from "./ProtectLayout";

const ProtectRoute = (Component) => {
  const ProtectRoute = (props) => {
    const token = localStorage.getItem("token");

    return token ? (
      <ProtectedLayout>
        <Component {...props} />
      </ProtectedLayout>
    ) : (
      <Navigate to="/auth" replace />
    );
  };
  return ProtectRoute;
};

export default ProtectRoute;
