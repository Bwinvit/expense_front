import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactionService } from "api/APIs/transaction";
import _ from "lodash";
import { transactionAction } from "./action";

const TransactionContext = createContext();

export const useTransaction = () => useContext(TransactionContext);

const TransactionProvider = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const { filter } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      fetchTransactions({});
    }
  }, [auth.user]);

  useEffect(() => {
    if (auth.user) {
      fetchTransactions({});
    }
  }, [filter]);

  const fetchTransactions = async () => {
    dispatch({ type: transactionAction.GET_TRANSACTIONS });

    const migrationData = {
      start: !_.isEmpty(filter.start)
        ? Math.floor(new Date(filter.start).getTime() / 1000)
        : "",
      end: !_.isEmpty(filter.end)
        ? Math.floor(new Date(filter.end).getTime() / 1000)
        : "",
      category: !_.isEmpty(filter.category)
        ? Object.values(filter.category).join(",")
        : "",
    };

    const response = await TransactionService.getTransactions(migrationData);
    dispatch({ type: transactionAction.SET_TRANSACTIONS, payload: response });
  };

  return (
    <TransactionContext.Provider value={{ dispatch, fetchTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
