import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { singUp } from "../services/usersServices";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z
    .string()
    .min(3, "Name must be more than 3 characters")
    .max(50, "Name must be less than 50 characters"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setErrorMessage(null);
      const res = await singUp(data);
      console.log(res.data.status);
      if (res.data.status === "success") {
        localStorage.setItem("token", res.data.token);
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (err.status >= 400 && err.status < 500)
        setErrorMessage(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
      <h2 className="mb-5">Register</h2>
      {errorMessage && <h5 className="mb-3 text-danger">{errorMessage}</h5>}
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Name
        </label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          id="password"
          {...register("name")}
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          id="email"
          {...register("email")}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="text"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          id="password"
          {...register("password")}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>
      <button className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default RegisterForm;
