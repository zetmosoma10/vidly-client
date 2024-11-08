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

const getMovie = async (id) => {
  const {
    data: { data },
  } = await axiosInstance.get(`/api/movies/${id}`);
  return data;
};

const saveMovie = async (movie) => {
  if (movie._id) {
    const { data } = await axiosInstance.patch(
      `/api/movies/${movie._id}`,
      movie.body
    );
    return data;
  }

  const { data } = await axiosInstance.post("/api/movies", movie.body);
  return data;
};

const removeMovie = async (id) => {
  return await axiosInstance.delete(`/api/movies/${id}`);
};

export { getMovies, removeMovie, getMovie, saveMovie };
