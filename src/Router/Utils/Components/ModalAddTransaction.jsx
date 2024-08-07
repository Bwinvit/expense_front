import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "Router/Auth/store/action.js";
import { CommonAction } from "../../Store/action.js";
import { TransactionService } from "api/APIs/transaction.js";
import _ from "lodash";
import ModalTransaction from "Components/ModalTransaction/ModalTransaction.jsx";

const ModalAddTransaction = ({ isVisibleModal, setIsVisibleModal }) => {
  const dispatch = useDispatch();
  const common = useSelector((state) => state.common);
  const { categoryTree } = useSelector((state) => state.common);

  const [loading, setLoading] = useState(false);
  const [optionCategoryTree, setOptionCategoryTree] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(categoryTree)) {
      optionCategory();
    }
  }, [categoryTree]);

  const handleCloseModal = () => {
    setIsVisibleModal(false);
  };

  const optionCategory = () => {
    const rearrangeData = _.map(categoryTree, (transactionType) => ({
      label: transactionType.name,
      title: transactionType.name,
      options: _.map(transactionType.categories, (cate) => ({
        label: cate.name,
        value: cate._id,
      })),
    }));

    setOptionCategoryTree(rearrangeData);
  };

  const handleClearTransaction = () => {
    dispatch({
      type: CommonAction.CLEAR_TRANSACTION_DATA,
    });
  };

  const handleChangeDate = (date, dateString) => {
    dispatch({
      type: CommonAction.CHANGE_TRANSACTION_DATA_DATE,
      payload: new Date(dateString).getTime() / 1000,
    });
  };

  const handleChangeCategory = (value) => {
    dispatch({
      type: CommonAction.CHANGE_TRANSACTION_DATA_CATEGORY,
      payload: value,
    });
  };

  const handleChangeAmount = (e) => {
    dispatch({
      type: CommonAction.CHANGE_TRANSACTION_DATA_AMOUNT,
      payload: e.target.value,
    });
  };

  const handleChangeDescription = (e) => {
    dispatch({
      type: CommonAction.CHANGE_TRANSACTION_DATA_DESCRIPTION,
      payload: e.target.value,
    });
  };

  const handleSubmitTransaction = () => {
    setLoading(true);
    validationForm();
  };

  const validationForm = () => {
    const errorArray = {};

    if (!common.transactionData.date) {
      errorArray.date = "Date is required";
    }
    if (!common.transactionData.categoryId) {
      errorArray.categoryId = "Category is required";
    }
    if (!common.transactionData.amount) {
      errorArray.amount = "Amount is required";
    } else if (common.transactionData.amount <= 0) {
      errorArray.amount = "Amount must be greater than 0";
    }

    if (_.isEmpty(errorArray)) {
      handlePostTransaction();
    } else {
      _.forEach(errorArray, (value, key) => {
        message.error(value);
      });
      setLoading(false);
    }
  };

  const handlePostTransaction = async () => {
    const migrateData = {
      date: common.transactionData.date,
      categoryId: common.transactionData.categoryId,
      amount: common.transactionData.amount,
      description: common.transactionData.description,
    };

    const { data, status } = await TransactionService.postTransaction(
      migrateData
    );
    if (status === 201) {
      message.success(`🎊 Successfully 🎊`);
      dispatch({
        type: AuthAction.ADD_TRANSACTION_SUCCESS,
      });
    } else {
      message.error(data.message);
      dispatch({
        type: AuthAction.ADD_TRANSACTION_FAILURE,
      });
    }
    setLoading(false);
  };

  const migrateProps = {
    isVisibleModal: isVisibleModal,
    handleClearTransaction: handleClearTransaction,
    handleCloseModal: handleCloseModal,
    handleChangeDate: handleChangeDate,
    handleChangeCategory: handleChangeCategory,
    handleChangeAmount: handleChangeAmount,
    handleChangeDescription: handleChangeDescription,
    handleSubmitTransaction: handleSubmitTransaction,
    optionCategoryTree: optionCategoryTree,
    loading: loading,
  };

  return <ModalTransaction props={migrateProps} />;
};

export default ModalAddTransaction;
