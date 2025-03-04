import { useState } from "react";
import { Link } from "react-router-dom";
// todo use react icons

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    role: "employee",
  });

  const { name, email, password, rePassword, role } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      console.error("Passwords do not match");
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    console.log("Submitting user data:", userData);
  };

  return (
    <>
      <section className="container">
        <div className="register-container">
          <h3 className="lead">
            <i className="fas fa-user" /> Create Your Account
          </h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                autoComplete="new-password"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
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
                value={rePassword}
                onChange={handleChange}
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
                      checked={role === "employee"}
                      onChange={handleRoleChange}
                    />
                    Employee
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="employer"
                      checked={role === "employer"}
                      onChange={handleRoleChange}
                    />
                    Employer
                  </label>
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-primary w-full"
              value="Register"
            />
          </form>
          <p className="my-1 text-center">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </section>
    </>
  );
}
