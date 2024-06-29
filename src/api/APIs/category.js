import _ from "lodash";

import axiosInstance from "../utils/request";

const uri = "/api/category";

const getCategory = async () =>
  await axiosInstance.get(`${uri}`).then((res) => res.data);

export const CategoryService = {
  getCategory,
};
