import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactionTypeService } from "api/APIs/transactionType";
import { CategoryService } from "api/APIs/category";
import { BillService } from "api/APIs/bill";
import { ManagementAction } from "./action";
import _ from "lodash";

const ManagementContext = createContext();

export const useManagement = () => useContext(ManagementContext);

const ManagementProvider = ({ children }) => {
  const { transactionType, category } = useSelector((state) => state.common);
  const management = useSelector((state) => state.management);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      initPage();
    }
  }, [auth.user]);

  const initPage = () => {
    try {
      fetchTransactionType();
      fetchCategory();
      fetchBill();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactionType = async () => {
    try {
      const transactionType = await TransactionTypeService.getTransactionType();

      dispatch({
        type: ManagementAction.FETCH_TRANSACTION_TYPE,
        payload: transactionType,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategory = async () => {
    try {
      const category = await CategoryService.getCategory();
      dispatch({
        type: ManagementAction.FETCH_CATEGORY,
        payload: category,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBill = async () => {
    try {
      const bill = await BillService.getBill();
      dispatch({ type: ManagementAction.FETCH_BILL, payload: bill });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ManagementContext.Provider
      value={{
        management,
        dispatch,
        fetchTransactionType,
        fetchCategory,
        fetchBill,
      }}
    >
      {children}
    </ManagementContext.Provider>
  );
};

export default ManagementProvider;
