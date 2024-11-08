import axiosInstance from "./axiosInstance";

const getMovies = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get("/api/movies");
    return data;
  } catch (err) {
    return err;
  }
};

const removeMovie = async (id) => {
  return await axiosInstance.delete(`/api/movies/${id}`);
};

export { getMovies, removeMovie };
