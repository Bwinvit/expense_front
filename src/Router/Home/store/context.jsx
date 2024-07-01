import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeService } from "api/APIs/home";
import _ from "lodash";
import { homeAction } from "./action";
import { AuthAction } from "Router/Auth/store/action";

const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

const HomeProvider = ({ children }) => {
  const home = useSelector((state) => state.home);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      initPage();
    }
  }, [auth.user]);

  useEffect(() => {
    if (auth.user && auth.transactionAdded) {
      initPage();
    }
  }, [auth.user, auth.transactionAdded]);

  const initPage = () => {
    fetchMonthlySum();
  };

  const fetchMonthlySum = async () => {
    await HomeService.getMonthlySummary().then((res) => {
      dispatch({ type: homeAction.FETCH_HOME_DATA, payload: res });
    });
    dispatch({ type: AuthAction.CLEAR_TRANSACTION_ADDED });
  };

  return (
    <HomeContext.Provider value={{ home, fetchMonthlySum }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
