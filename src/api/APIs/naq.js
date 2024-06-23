import axiosInstance from "../utils/request";
import _ from "lodash";

const getQuote = async () =>
  await axiosInstance.get("/api/naq/quote").then((res) => res.data);

export const NAQService = {
  getQuote,
};
