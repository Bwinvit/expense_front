import _ from "lodash";

import axiosInstance from "../utils/request";

const uri = "/api/chart";

const getExpenseBreakdown = async () =>
  axiosInstance.get(`${uri}/expense-breakdown`).then((res) => res.data);

export const ChartService = {
  getExpenseBreakdown,
};
