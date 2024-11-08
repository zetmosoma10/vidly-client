import axiosInstance from "./axiosInstance";

const getGenres = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get("/api/genres");
    return data;
  } catch (err) {
    return err;
  }
};

export { getGenres };
