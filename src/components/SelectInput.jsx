const SelectInput = ({ label, id, errors, register, genres, defaultValue }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        id={id}
        className={`form-select ${errors[id] ? "is-invalid" : ""}`}
        defaultValue={defaultValue}
        {...register(id)}
      >
        <option value="">--Select genre--</option>
        {genres.map((genre) => (
          <option key={genre._id} value={genre.genre}>
            {genre.genre}
          </option>
        ))}
      </select>
      {errors[id] && (
        <div className="invalid-feedback">{errors[id].message}</div>
      )}
    </div>
  );
};

export default SelectInput;
