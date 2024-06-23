import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd"; // Importing message from antd
import { fetchUserProfile, logout, getQuote, setOnlineStatus } from "./action";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [prevIsOnline, setPrevIsOnline] = useState(navigator.onLine); // State to track previous online status

  useEffect(() => {
    const updateOnlineStatus = () => {
      const isOnline = navigator.onLine;
      dispatch(setOnlineStatus(isOnline));

      // Display a message only when the online status changes
      if (isOnline !== prevIsOnline) {
        if (isOnline) {
          message.success("You are online");
        } else {
          message.warning("You are offline");
        }
        setPrevIsOnline(isOnline); // Update the previous online status
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Set initial online status
    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [dispatch, prevIsOnline]);

  useEffect(() => {
    if (auth.isOnline) {
      if (auth.token) {
        dispatch(fetchUserProfile());
      } else {
        dispatch(getQuote());
      }
    }
  }, [auth.token, auth.isOnline, dispatch]);

  useEffect(() => {
    if (auth.error === "Token has expired") {
      dispatch(logout());
    }
  }, [auth.error, dispatch]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
