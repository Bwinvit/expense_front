import _ from "lodash";

import axiosInstance from "../utils/request";

const uri = "/api/transaction";

const postTransaction = async (data) => await axiosInstance.post(uri, data);

export const TransactionService = {
  postTransaction,
};
