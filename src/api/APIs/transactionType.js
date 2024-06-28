import axiosInstance from "../utils/request";
import _ from "lodash";

const uri = "/api/transaction-type";

const postTransactionType = async ({ name, description }) =>
  await axiosInstance
    .post(`${uri}`, { name, description })
    .then((res) => res.data);
const getTransactionType = async () =>
  await axiosInstance.get(`${uri}`).then((res) => res.data);
const putTransactionType = async ({ id, name, description }) =>
  await axiosInstance
    .put(`${uri}/${id}`, { name, description })
    .then((res) => res.data);
const deleteTransactionType = async ({ id }) =>
  await axiosInstance.delete(`${uri}/${id}`).then((res) => res.data);

export const TransactionTypeService = {
  postTransactionType,
  getTransactionType,
  putTransactionType,
  deleteTransactionType,
};
