/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../apiHooks/useAuth";
import { useForm } from "../../apiHooks/useForm";

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const { isLoading, loginHandler, error } = useLogin();

  useEffect(() => {
    if (error) {
      setServerError(error);
      const timer = setTimeout(() => {
        setServerError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  useEffect(() => {
    if (formErrors) {
      const timer = setTimeout(() => {
        setFormErrors(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [formErrors]);

  const initialValues = { email: "", password: "" };

  const validateForm = (formValues) => {
    const regexEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

    if (!formValues.email || formValues.email.trim() === "") {
      setFormErrors("Email is required");
      return false;
    }

    if (!regexEmail.test(formValues.email)) {
      setFormErrors("Please enter a valid email address");
      return false;
    }

    if (!formValues.password) {
      setFormErrors("Password is required");
      return false;
    }

 
    setFormErrors(null);
    return true;
  };

  const handleFormSubmit = async (formData) => {
    setServerError(null);
    setFormErrors(null);

    if (!validateForm(formData)) {
      return;
    }

    try {
      const { email, password } = formData;
      const result = await loginHandler(email, password);

      if (result && !error) {
        navigate("/");
      }
    } catch (err) {
      setServerError(err.message);
    }
  };

  const { formValues, changeHandler, submitHandler } = useForm(
    initialValues,
    handleFormSubmit
  );

  return (
    <>
      <section className="container-profile">
        {formErrors && <div className="error-message">{formErrors}</div>}
        {!formErrors && serverError && (
          <div className="error-message">{serverError}</div>
        )}

        <div className="login-container">
          <h3 className="lead">
            <i className="fas fa-user" /> Sign Into Your Account
          </h3>
          <form className="form" onSubmit={submitHandler} noValidate>
            <div className="form-group">
              <input
                autoComplete="username"
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                autoComplete="current-password"
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={changeHandler}
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
