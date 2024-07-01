import _ from "lodash";

import axiosInstance from "../utils/request";

const uri = "/api/home";

const getMonthlySummary = async () =>
  axiosInstance.get(`${uri}/month-sum`).then((res) => res.data);

export const HomeService = {
  getMonthlySummary,
};
