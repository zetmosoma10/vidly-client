import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { genres } from "./../services/fakeGenreService";
import { movies } from "../services/fakeMovieService";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters"),
  genre: z.string().min(1, "Genre is required"),
  numberInStock: z
    .number({ invalid_type_error: "stock is required" })
    .min(0, "Stock should be between 0 and 100")
    .max(100, "Stock should be between 0 and 100"),
  dailyRentalRate: z
    .number({ invalid_type_error: "rate is required" })
    .min(0, "rate must be between 0 and 10")
    .max(10, "rate must be between 0 and 10"),
});

const MovieForm = ({ title, genre, numberInStock, dailyRentalRate, _id }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    const movieId = _id || nanoid(); // Use provided ID or generate a new one

    // Check if the movie exists
    const existingMovieIndex = movies.findIndex(
      (movie) => movie._id === movieId
    );

    if (existingMovieIndex > -1) {
      // Update existing movie
      movies[existingMovieIndex] = {
        ...movies[existingMovieIndex],
        ...data,
        _id: movieId,
        genre:
          genres.find((g) => g.genre === data.genre) ||
          movies[existingMovieIndex].genre,
      };
    } else {
      // Save new movie
      movies.push({
        _id: movieId,
        ...data,
        genre: genres.find((g) => g.genre === data.genre), // Assign genre object based on name
      });

      reset();
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto mb-5">
      <h2 className="mb-5">Movie Form</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          id="title"
          defaultValue={title || ""}
          {...register("title")}
        />
        {errors.title && (
          <div className="invalid-feedback">{errors.title.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="genre" className="form-label">
          Genre
        </label>
        <select
          id="genre"
          className={`form-select ${errors.title ? "is-invalid" : ""}`}
          defaultValue={genre || ""}
          {...register("genre")}
        >
          <option value="">--Select genre--</option>
          {genres.map((genre) => (
            <option key={genre._id} value={genre.genre}>
              {genre.genre}
            </option>
          ))}
        </select>
        {errors.genre && (
          <div className="invalid-feedback">{errors.genre.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="stock" className="form-label">
          Number in Stock
        </label>
        <input
          type="string"
          className={`form-control ${errors.numberInStock ? "is-invalid" : ""}`}
          id="stock"
          defaultValue={numberInStock || ""}
          {...register("numberInStock", { valueAsNumber: true })}
        />
        {errors.numberInStock && (
          <div className="invalid-feedback">{errors.numberInStock.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="rate" className="form-label">
          Rate
        </label>
        <input
          type="string"
          className={`form-control ${
            errors.dailyRentalRate ? "is-invalid" : ""
          }`}
          id="rate"
          defaultValue={dailyRentalRate || ""}
          {...register("dailyRentalRate", { valueAsNumber: true })}
        />
        {errors.dailyRentalRate && (
          <div className="invalid-feedback">
            {errors.dailyRentalRate.message}
          </div>
        )}
      </div>
      <button className="btn btn-primary">Save</button>
    </form>
  );
};

export default MovieForm;
