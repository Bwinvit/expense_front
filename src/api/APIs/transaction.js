import _ from "lodash";

import axiosInstance from "../utils/request";

const uri = "/api/transaction";

const postTransaction = async (data) => await axiosInstance.post(uri, data);
const getTransactions = async ({ start, end, category }) => {
  const params = {};

  if (start) {
    params.start = start;
  }
  if (end) {
    params.end = end;
  }
  if (category) {
    params.category = category;
  }

  const response = await axiosInstance.get(uri, { params });
  return response.data;
};
const getTransaction = async (id) => await axiosInstance.get(`${uri}/${id}`);
const updateTransaction = async ({ data, id }) =>
  await axiosInstance.put(`${uri}/${id}`, data);

const deleteTransaction = async (id) =>
  await axiosInstance.delete(`${uri}/${id}`);

export const TransactionService = {
  postTransaction,
  getTransactions: _.memoize(getTransactions),
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
