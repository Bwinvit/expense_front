import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { AuthService } from "api/APIs/auth";
import { NAQService } from "api/APIs/naq";
import { AuthAction } from "./action";
import _ from "lodash";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [prevIsOnline, setPrevIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const isOnline = navigator.onLine;
      setOnlineStatus(isOnline);

      if (isOnline !== prevIsOnline) {
        if (isOnline) {
          message.success("You are online");
        } else {
          message.warning("You are offline");
        }
        setPrevIsOnline(isOnline);
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [dispatch, prevIsOnline]);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: AuthAction.LOGOUT });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (auth.isOnline) {
      if (token === null && _.isEmpty(auth.quote)) {
        getQuote();
      }
    }
  }, [auth.isOnline, logout]);

  useEffect(() => {
    if (auth.error === "Token has expired") {
      logout();
    }
  }, [auth.error, dispatch]);

  const setPageHeader = (header) => {
    dispatch({ type: AuthAction.SET_PAGE_HEADER, payload: header });
  };

  const login = async (email, password) => {
    try {
      const response = await AuthService.postLogin({ email, password });
      const { token } = response;

      localStorage.setItem("token", token);
      dispatch({ type: AuthAction.LOGIN_SUCCESS, payload: { token } });
    } catch (error) {
      dispatch({
        type: AuthAction.LOGIN_FAILURE,
        payload: error.response.data.error,
      });
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await AuthService.getProfile();
      dispatch({
        type: AuthAction.SET_UPCOMING_BILLS,
        payload: response.upcomingBills,
      });
      dispatch({
        type: AuthAction.FETCH_USER_PROFILE_SUCCESS,
        payload: response,
      });
    } catch (error) {
      logout();
      dispatch({
        type: AuthAction.FETCH_USER_PROFILE_FAILURE,
        payload: error.response.data.error,
      });
    }
  };

  const getQuote = async () => {
    try {
      const response = await NAQService.getQuote();
      dispatch({ type: AuthAction.FETCH_QUOTE_SUCCESS, payload: response });
    } catch (error) {
      dispatch({
        type: AuthAction.FETCH_QUOTE_FAILURE,
        payload: error.message,
      });
    }
  };

  const setOnlineStatus = (isOnline) => {
    dispatch({ type: AuthAction.SET_ONLINE_STATUS, payload: isOnline });
  };

  return (
    <AuthContext.Provider
      value={{ auth, setPageHeader, login, logout, fetchUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
