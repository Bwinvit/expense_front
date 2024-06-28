import axiosInstance from "../utils/request";
import _ from "lodash";

const uri = "/api/category";

const getCategory = async () =>
  await axiosInstance.get(`${uri}`).then((res) => res.data);

export const CategoryService = {
  getCategory,
};
