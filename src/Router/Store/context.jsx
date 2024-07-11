import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import _ from "lodash";
import { TransactionTypeService } from "api/APIs/transactionType";
import { CategoryService } from "api/APIs/category";
import { CommonAction } from "./action";
import { useAuth } from "Router/Auth/store/context";

const CommonContext = createContext();

export const useTransactionType = () => useContext(CommonContext);

const CommonProvider = ({ children }) => {
  const { fetchUserProfile } = useAuth();
  const dispatch = useDispatch();
  const common = useSelector((state) => state.common);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      initialize();
    }
  }, [auth.token]);

  const initialize = async () => {
    try {
      await fetchUserProfile();
      initPage();
    } catch (error) {
      message.error("Failed to fetch user profile");
      console.error("Error fetching user profile:", error);
    }
  };

  const initPage = async () => {
    try {
      const [transactionTypeResponse, categoryResponse] = await Promise.all([
        fetchTransactionType(),
        fetchCategory(),
      ]);

      if (!_.isEmpty(transactionTypeResponse) && !_.isEmpty(categoryResponse)) {
        const result = _.map(transactionTypeResponse, (transactionType) => ({
          ...transactionType,
          categories: _.filter(categoryResponse, {
            type: transactionType._id,
          }),
        }));

        dispatch({
          type: CommonAction.MIGRATE_TRANSACTION_TYPE_TREE,
          payload: result,
        });
      }
    } catch (error) {
      message.error("Failed to initialize page data");
      console.error("Error initializing page:", error);
    }
  };

  const fetchTransactionType = async () => {
    try {
      const response = await TransactionTypeService.getTransactionType();
      dispatch({
        type: CommonAction.FETCH_TRANSACTION_TYPE_SUCCESS,
        payload: response,
      });

      return response;
    } catch (error) {
      dispatch({
        type: CommonAction.FETCH_TRANSACTION_TYPE_FAILURE,
        payload: error.response.data.error,
      });
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await CategoryService.getCategory();
      dispatch({
        type: CommonAction.FETCH_CATEGORY_SUCCESS,
        payload: response,
      });

      return response;
    } catch (error) {
      dispatch({
        type: CommonAction.FETCH_CATEGORY_FAILURE,
        payload: error.response.data.error,
      });
    }
  };

  return (
    <CommonContext.Provider
      value={{ common, fetchTransactionType, fetchCategory }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonProvider;
