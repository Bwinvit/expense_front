import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeService } from "api/APIs/home";
import { ChartService } from "api/APIs/chart";
import _ from "lodash";
import { homeAction } from "./action";
import { AuthAction } from "Router/Auth/store/action";
import { transformExpenseBreakdown } from "./Utils/ExpenseBreakdownExtract";

const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

const HomeProvider = ({ children }) => {
  const home = useSelector((state) => state.home);
  const auth = useSelector((state) => state.auth);
  const common = useSelector((state) => state.common);
  const dispatch = useDispatch();

  useEffect(() => {
    initPage();
  }, [auth.user, common.category]);

  useEffect(() => {
    if (auth.transactionAdded) {
      initPage();
    }
  }, [auth.user, auth.transactionAdded]);

  const initPage = async () => {
    if (auth.user && !_.isEmpty(common.category.data)) {
      const transTitle = await fetchMonthlySum();
      fetchExpenseBreakdown(transTitle);
    }
  };

  const fetchMonthlySum = async () => {
    let transactionTitle;
    dispatch({ type: homeAction.STATE_HOME_DATA });
    if (auth.user) {
      await HomeService.getMonthlySummary().then((res) => {
        functionTransform(res);
        dispatch({ type: homeAction.FETCH_HOME_DATA, payload: res });
      });
      dispatch({ type: AuthAction.CLEAR_TRANSACTION_ADDED });
      dispatch({ type: homeAction.STATE_HOME_DATA });

      return transactionTitle;
    }
  };

  const functionTransform = (transaction) => {
    const transactionTitle = _.map(transaction.totalsByType, (type) => ({
      transactionType: type.transactionType,
      isSelected: true,
    }));
    dispatch({
      type: homeAction.SET_TRANSACTION_TYPE_TITLE,
      payload: transactionTitle,
    });
  };

  const fetchExpenseBreakdown = async (transTitle) => {
    dispatch({ type: homeAction.STATE_EXPENSE_BREAKDOWN });
    await ChartService.getExpenseBreakdown().then((res) => {
      const transformedData = transformExpenseBreakdown({
        transactions: res,
        categories: common.category.data,
      });
      dispatch({
        type: homeAction.FETCH_EXPENSE_BREAKDOWN,
        payload: { extractData: transformedData, expenseRawDate: res },
      });
      dispatch({ type: homeAction.STATE_EXPENSE_BREAKDOWN });
    });
  };

  return (
    <HomeContext.Provider
      value={{ home, initPage, fetchMonthlySum, fetchExpenseBreakdown }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
