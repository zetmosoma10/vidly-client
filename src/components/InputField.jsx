const InputField = ({
  id,
  label,
  errors,
  register,
  defaultValue = "",
  type = "text",
  registerOptions,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={`form-control ${errors[id] ? "is-invalid" : ""}`}
        id={id}
        defaultValue={defaultValue}
        {...register(id, registerOptions)}
      />
      {errors[id] && (
        <div className="invalid-feedback">{errors[id].message}</div>
      )}
    </div>
  );
};

export default InputField;
