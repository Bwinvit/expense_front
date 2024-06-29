import _ from "lodash";

import axiosInstance from "../utils/request";

const getProfile = async () =>
  await axiosInstance.get("/api/auth/profile").then((res) => res.data);
const postLogin = async (data) =>
  await axiosInstance.post("/api/auth", data).then((res) => res.data);

export const AuthService = {
  getProfile,
  postLogin,
};
