/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";
import { useLogin } from "../../apiHooks/useAuth";
import { useForm } from "../../apiHooks/useForm";

export default function Login() {
  const { user, isLoading, loginHander } = useLogin();

  const initialValues = { email: "", password: "" };

  const handleFormSubmit = ({ email, password }) => {
    loginHander(email, password);
  };

  const { formValues, changeHander, sumbitHander } = useForm(
    initialValues,
    handleFormSubmit
  );

  return (
    <>
      <section className="container">
        <div className="login-container">
          <h3 className="lead">
            <i className="fas fa-user" /> Sign Into Your Account
          </h3>

          <form className="form" onSubmit={sumbitHander}>
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
