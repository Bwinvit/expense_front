import _ from "lodash";

import axiosInstance from "../utils/request";

const getQuote = async () =>
  await axiosInstance.get("/api/naq/quote").then((res) => res.data);

export const NAQService = {
  getQuote,
};
