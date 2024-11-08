import axiosInstance from "./axiosInstance";

const singUp = (user) => {
  return axiosInstance.post("/api/users", user);
};

export { singUp };
