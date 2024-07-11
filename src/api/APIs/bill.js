import _ from "lodash";

import axiosInstance from "../utils/request";

const uri = "/api/bill";

const createBill = async ({
  categoryId,
  amount,
  description,
  dueDate,
  isRecurring,
  recurrencePeriod,
}) =>
  await axiosInstance
    .post(`${uri}/create`, {
      categoryId,
      amount,
      description,
      dueDate,
      isRecurring,
      recurrencePeriod,
    })
    .then((res) => res.data);

const getBill = async () =>
  axiosInstance.get(`${uri}/getBills`).then((res) => res.data);

const updateBill = async ({
  id,
  categoryId,
  amount,
  description,
  dueDate,
  isRecurring,
  recurrencePeriod,
}) =>
  await axiosInstance
    .post(`${uri}/update/${id}`, {
      categoryId,
      amount,
      description,
      dueDate,
      isRecurring,
      recurrencePeriod,
    })
    .then((res) => res.data);

const deleteBill = async (id) =>
  axiosInstance.delete(`${uri}/delete/${id}`).then((res) => res.data);

const payBill = async ({ id, paidAmount }) =>
  axiosInstance
    .put(`${uri}/markAsPaid/${id}`, { paidAmount })
    .then((res) => res.data);

export const BillService = {
  createBill,
  getBill,
  updateBill,
  deleteBill,
  payBill,
};
