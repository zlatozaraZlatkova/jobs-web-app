import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// todo use react icons

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log("Please enter both email and password");
      return;
    }
    console.log("Submitting user data:", formData);
    navigate("/home");
  };

  return (
    <>
      <section className="container">
        <div className="login-container">
          <h3 className="lead">
            <i className="fas fa-user" /> Sign Into Your Account
          </h3>
  
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                autoComplete="username"
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
                autoComplete="current-password"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary w-full"
              value="Login"
            />
          </form>
          <p className="my-1 text-center">
            Don&apos;t have an account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </section>
    </>
  );
}
