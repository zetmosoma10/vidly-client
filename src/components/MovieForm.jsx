import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { genres } from "./../services/fakeGenreService";

const schema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters"),
  genre: z.string(),
  stock: z
    .number()
    .min(0, "Stock should be between 0 and 100")
    .max(100, "Stock should be between 0 and 100"),
  rate: z
    .number()
    .min(0, "rate must be between 0 and 10")
    .max(10, "rate must be between 0 and 10"),
});

const MovieForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
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
        >
          <option selected></option>
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
          type="stock"
          className={`form-control ${errors.stock ? "is-invalid" : ""}`}
          id="email"
          {...register("stock")}
        />
        {errors.stock && (
          <div className="invalid-feedback">{errors.stock.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="rate" className="form-label">
          Rate
        </label>
        <input
          type="text"
          className={`form-control ${errors.rate ? "is-invalid" : ""}`}
          id="rate"
          {...register("rate")}
        />
        {errors.rate && (
          <div className="invalid-feedback">{errors.rate.message}</div>
        )}
      </div>
      <button className="btn btn-primary">Save</button>
    </form>
  );
};

export default MovieForm;
