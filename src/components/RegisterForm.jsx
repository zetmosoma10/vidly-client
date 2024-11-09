import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { singUp } from "../services/usersServices";
import { useState } from "react";
import InputField from "./InputField";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z
    .string()
    .min(3, "Name must be more than 3 characters")
    .max(50, "Name must be less than 50 characters"),
});

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setErrorMessage(null);
      const res = await singUp(data);
      if (res.data.status === "success") {
        localStorage.setItem("token", res.data.token);
        window.location.replace("/");
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
      <InputField id="name" label="Name" errors={errors} register={register} />
      <InputField
        id="email"
        label="Email address"
        errors={errors}
        register={register}
      />
      <InputField
        id="password"
        label="Password"
        errors={errors}
        register={register}
      />
      <button className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default RegisterForm;
