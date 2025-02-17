import { Link } from "react-router-dom";

// todo use react icons

export default function Login() {
  return (
    <>
      <section className="login-container">
        <p className="lead">
          <i className="fas fa-user" /> Sign Into Your Account
        </p>
        <form className="form">
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don&apos;t have an account? <Link to={"/register"}>Register</Link>
        </p>
      </section>
    </>
  );
}
