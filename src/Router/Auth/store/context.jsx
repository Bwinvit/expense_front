import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "./action";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (auth.token) {
            dispatch(fetchUserProfile());
        }
    }, [auth.token, dispatch]);

    useEffect(() => {
        if (auth.token && auth.user === null) {
            dispatch(logout());
        }
    }, [auth.token, auth.user, dispatch]);

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
