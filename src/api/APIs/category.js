import _ from "lodash";

import axiosInstance from "../utils/request";

const uri = "/api/category";

const createCategory = async ({ name, type, description }) =>
  await axiosInstance
    .post(`${uri}`, {
      name,
      type,
      description,
    })
    .then((res) => res.data);
const getCategory = async () =>
  await axiosInstance.get(`${uri}`).then((res) => res.data);
const updateCategory = async (data) =>
  await axiosInstance.put(`${uri}/${data.id}`, data).then((res) => res.data);
const deleteCategory = async (id) =>
  await axiosInstance.delete(`${uri}/${id}`).then((res) => res.data);

export const CategoryService = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
