import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../apiHooks/useForm";
import { useRegister } from "../../apiHooks/useAuth";


export default function Register() {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(null);
  const [serverError, setServerError] = useState(null);

  const { isLoading, registerHandler } = useRegister();

  const initialValues = { name: "", email: "", password: "", rePassword: "", role: "employee" };

  const handlerFormSumbit = async (formData) => {
    const { name, email, password, rePassword, role } = formData;
    
    try {
      if (password !== rePassword) {
        setPasswordError("Passwords do not match! Please try again.");
        return;
      }

      setPasswordError(null);
      const userData = await registerHandler(name, email, password, role);
      console.log("Submitting user data:", userData);

      navigate("/");


    } catch (err) {
      console.log("Error register user", err);
      const errMsg = "Invalid email or password. Please try again.";
      setServerError(errMsg);
      
      resetForm();

  
    }


  };

  const { formValues, changeHandler, submitHandler, roleChangeHandler, resetForm } = useForm(initialValues, handlerFormSumbit);


  return (
    <>
      <section className="container-profile">
      {serverError && <div className="error-message">{serverError}</div>}

        <div className="register-container">
          <h3 className="lead">
            <i className="fas fa-user" /> Create Your Account
          </h3>
          {passwordError && (
            <div className="alert alert-danger">{passwordError}</div>
          )}

          <form className="form" onSubmit={submitHandler}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formValues.name}
                onChange={changeHandler}
                required
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
                required
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
                required
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
                required
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
              disabled={isLoading}>
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
