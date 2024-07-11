import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "Router/Auth/store/action.js";
import { transactionAction } from "Router/Transaction/store/action.js";
import { TransactionService } from "api/APIs/transaction.js";
import _ from "lodash";
import ModalTransaction from "Components/ModalTransaction/ModalTransaction.jsx";
import { useTransaction } from "Router/Transaction/store/context";

const ModalEditTransaction = ({ isVisibleModal, setIsVisibleModal }) => {
  const dispatch = useDispatch();
  const transaction = useSelector((state) => state.transaction);
  const { categoryTree } = useSelector((state) => state.common);
  const { fetchTransactions } = useTransaction();

  const [loading, setLoading] = useState(false);
  const [optionCategoryTree, setOptionCategoryTree] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(categoryTree)) {
      optionCategory();
    }
  }, [categoryTree]);

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

  const harvestTransacctionData = () => {
    const pickedTransaction = _.find(
      transaction.transactionData,
      (trans) => trans._id === transaction.transactionInAction
    );
    return pickedTransaction;
  };

  const handleCloseModal = () => {
    setIsVisibleModal(false);
  };

  const handleClearTransaction = () => {
    dispatch({
      type: transactionAction.CLEAR_TRANSACTION_DATA,
    });
  };

  const handleChangeDate = (date, dateString) => {
    dispatch({
      type: transactionAction.CHANGE_TRANSACTION_DATA_DATE,
      payload: new Date(dateString).getTime() / 1000,
    });
  };

  const handleChangeCategory = (value) => {
    dispatch({
      type: transactionAction.CHANGE_TRANSACTION_DATA_CATEGORY,
      payload: value,
    });
  };

  const handleChangeAmount = (e) => {
    dispatch({
      type: transactionAction.CHANGE_TRANSACTION_DATA_AMOUNT,
      payload: e.target.value,
    });
  };

  const handleChangeDescription = (e) => {
    dispatch({
      type: transactionAction.CHANGE_TRANSACTION_DATA_DESCRIPTION,
      payload: e.target.value,
    });
  };

  const handleSubmitTransaction = () => {
    setLoading(true);
    handlePostTransaction();
  };

  const handlePostTransaction = async () => {
    const migrateData = {
      date: transaction.transactionPayload.date,
      categoryId: transaction.transactionPayload.categoryId,
      amount: transaction.transactionPayload.amount,
      description: transaction.transactionPayload.description,
    };

    const { data, status } = await TransactionService.updateTransaction({
      data: migrateData,
      id: transaction.transactionInAction,
    });
    if (status === 200) {
      message.success(`🎊 Successfully 🎊`);
      dispatch({
        type: AuthAction.ADD_TRANSACTION_SUCCESS,
      });
      fetchTransactions();
      handleCloseModal();
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
    transactionPayload: harvestTransacctionData(),
  };

  return <ModalTransaction props={migrateProps} />;
};

export default ModalEditTransaction;
