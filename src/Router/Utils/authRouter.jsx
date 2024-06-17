import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = (Component) => {
    const RouteComponent = (props) => {
        const auth = useSelector((state) => state.auth);

        return auth.token ? (
            <Navigate to="/" replace />
        ) : (
            <Component {...props} />
        );
    };
    return RouteComponent;
};

export default AuthRoute;
