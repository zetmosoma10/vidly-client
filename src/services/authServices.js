import axiosInstance from "./axiosInstance";

const login = (user) => {
  return axiosInstance.post("/api/auth", user);
};

export { login };
