import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { saveMovie } from "../services/moviesServices";
import { toast } from "react-toastify";
import _ from "lodash";
import { useContext } from "react";
import { UserContext } from "../pages/HomeLayout";

const schema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters"),
  genreId: z.string().min(1, "Genre is required"),
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
  const { genres } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      if (_id) {
        const res = await saveMovie({ _id, data });
        if (res.status === "success") {
          toast.success("Movie updated successfully");
          return navigate("/", { replace: true });
        }
      } else {
        const genre = genres.find((g) => g.genre === data.genreId);
        const body = _.set(data, "genreId", genre._id);

        const res = await saveMovie({ body });
        console.log(res);
        if (res.status === "success") {
          toast.success("Movie created successfully");
          return navigate("/", { replace: true });
        }
      }
    } catch (err) {
      if (err.status >= 400 && err.status < 500)
        toast.error(err.response.data.message);
    }
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
          className={`form-select ${errors.genreId ? "is-invalid" : ""}`}
          defaultValue={genre || ""}
          {...register("genreId")}
        >
          <option value="">--Select genre--</option>
          {genres.map((genre) => (
            <option key={genre._id} value={genre.genre}>
              {genre.genre}
            </option>
          ))}
        </select>
        {errors.genreId && (
          <div className="invalid-feedback">{errors.genreId.message}</div>
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
      <button className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default MovieForm;
