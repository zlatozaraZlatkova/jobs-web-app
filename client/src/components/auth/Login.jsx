import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../apiHooks/useAuth";
import { useForm } from "../../apiHooks/useForm";

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const { isLoading, loginHandler } = useLogin();

  const initialValues = { email: "", password: "" };

  const handleFormSubmit = async (formData) => {
    try {
      const { email, password } = formData;
      const result = await loginHandler(email, password);
      console.log("Submitting user data:", result);

      navigate("/");

    } catch (err) {
      console.log("Error user login data", err);

      const errMsg = "Invalid email or password. Please try again.";
      setServerError(errMsg);
      
      resetForm();
    }
  };

  const {  formValues, changeHander, sumbitHandler, resetForm } = useForm(
    initialValues,
    handleFormSubmit
  );

  return (
    <>
      <section className="container-profile">
      {serverError && <div className="error-message">{serverError}</div>}
        <div className="login-container">
          <h3 className="lead">
            <i className="fas fa-user" /> Sign Into Your Account
          </h3>

          <form className="form" onSubmit={sumbitHandler}>
            <div className="form-group">
              <input
                autoComplete="username"
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onChange={changeHander}
                required
              />
            </div>
            <div className="form-group">
              <input
                autoComplete="current-password"
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={changeHander}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
          <p className="my-1 text-center">
            Don&apos;t have an account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </section>
    </>
  );
}