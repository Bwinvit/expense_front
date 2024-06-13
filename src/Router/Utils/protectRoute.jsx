import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EnhancedProtectRoute = (Component) => {
    const ProtectRoute = (props) => {
        const auth = useSelector((state) => state.auth);
        
        return auth.token ? (
            <Component {...props} />
        ) : (
            <Navigate to="/auth" replace />
        );
    };
    return ProtectRoute;
};

export default EnhancedProtectRoute;
