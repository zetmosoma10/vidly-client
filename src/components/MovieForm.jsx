import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useOutletContext } from "react-router-dom";
import InputField from "./InputField";

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
  const genres = useOutletContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto mb-5">
      <h2 className="mb-5">Movie Form</h2>
      <InputField
        id="title"
        label="Title"
        errors={errors}
        register={register}
        defaultValue={title}
      />
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
      <InputField
        id="numberInStock"
        label="Number in Stock"
        errors={errors}
        register={register}
        defaultValue={numberInStock}
        registerOptions={{ valueAsNumber: true }}
      />
      <InputField
        id="dailyRentalRate"
        label="Rate"
        errors={errors}
        register={register}
        defaultValue={dailyRentalRate}
        registerOptions={{ valueAsNumber: true }}
      />
      <button className="btn btn-primary">Save</button>
    </form>
  );
};

export default MovieForm;
