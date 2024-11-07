import axiosInstance from "./axiosInstance";

const getMovies = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get("/api/movies");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getGenres = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get("/api/genres");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default {
  getGenres,
  getMovies,
};
