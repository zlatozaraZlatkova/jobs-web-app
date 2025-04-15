import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../apiHooks/useForm";
import { useRegister } from "../../apiHooks/useAuth";

export default function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const { isLoading, registerHandler, error } = useRegister();

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

  const validateForm = (formValues) => {
    const regexEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

   
    if (!formValues.name && !formValues.email && !formValues.password && !formValues.rePassword) {
      setFormErrors("All fields are requered");
      return false;
    }

    if (!formValues.email || formValues.email.trim() === "") {
      setFormErrors("Email is required");
      return false;
    }

  
    if (!regexEmail.test(formValues.email)) {
      setFormErrors("Please enter a valid email address");
      return false;
    }

    if (formValues.name && formValues.name.lenght < 2) {
      setFormErrors("Name must be at least 2 characters");
      return false;
    }

    if (!formValues.password) {
      setFormErrors("Password is required");
      return false;
    }


    if (formValues.password && formValues.password.lenght < 8) {
      setFormErrors("Password must be at least 8 characters");
      return false;
    }

    if (formValues.password !== formValues.rePassword) {
      setFormErrors("Passwords do not match! Please try again.");
      return;
    }

    setFormErrors(null);
    return true;
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    role: "employee",
  };

  const handlerFormSumbit = async (formData) => {
    const { name, email, password, role } = formData;

    setServerError(null);
    setFormErrors(null);

    if (!validateForm(formData)) {
      return;
    }

    try {
      const userData = await registerHandler(name, email, password, role);

      if (userData && !error) {
        navigate("/");
      }
    } catch (err) {
      setServerError(err.message);
      resetForm();
    }
  };

  const { formValues, changeHandler, submitHandler, roleChangeHandler, resetForm } = useForm(initialValues, handlerFormSumbit);

  return (
    <>
      <section className="container-profile">
        {formErrors && <div className="error-message">{formErrors}</div>}
        {!formErrors && serverError && (
          <div className="error-message">{serverError}</div>
        )}

        <div className="register-container">

          <h3 className="lead">
            <i className="fas fa-user" /> Create Your Account
          </h3>
          <form className="form" onSubmit={submitHandler}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formValues.name}
                onChange={changeHandler}
                minLength="2"
              />
            </div>
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
                autoComplete="new-password"
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={changeHandler}
                minLength="8"
              />
            </div>
            <div className="form-group">
              <input
                autoComplete="new-password"
                type="password"
                placeholder="Confirm Password"
                name="rePassword"
                value={formValues.rePassword}
                onChange={changeHandler}
                minLength="8"
              />
            </div>
            <div className="form-group">
              <div className="radio-container">
                <p>Select account type:</p>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="employee"
                      checked={formValues.role === "employee"}
                      onChange={roleChangeHandler}
                    />
                    Employee
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="employer"
                      checked={formValues.role === "employer"}
                      onChange={roleChangeHandler}
                    />
                    Employer
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="my-1 text-center">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </section>
    </>
  );
}
