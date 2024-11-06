const LoginForm = () => {
  return (
    <form className="w-50 mx-auto">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input type="email" className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input type="text" className="form-control" id="password" />
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
  );
};

export default LoginForm;
