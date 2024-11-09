import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import auth from "../services/authServices";
import InputField from "./InputField";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    location.state = null;
    try {
      setErrorMessage(null);
      const res = await auth.login(data);
      localStorage.setItem("token", res.data.token);
      window.location.replace("/");
    } catch (err) {
      console.log(err);
      if (err.status >= 400 && err.status < 500)
        setErrorMessage(err.response.data.message);
    }
  };

  const infoText = location.state?.message || null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
      <h2 className="mb-5">Login</h2>
      {errorMessage && <h5 className="mb-3 text-danger">{errorMessage}</h5>}
      {infoText && <h5 className="mb-3 text-danger">{infoText}</h5>}
      <InputField
        id="email"
        label="Email address"
        type="email"
        errors={errors}
        register={register}
      />
      <InputField
        id="password"
        label="Password"
        type="text"
        errors={errors}
        register={register}
      />
      <button className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default LoginForm;
