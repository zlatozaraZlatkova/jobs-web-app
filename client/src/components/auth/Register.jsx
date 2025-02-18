import { Link } from "react-router-dom";

// todo use react icons

export default function Register() {
  return (
    <>
      <section className="container">
        <div className="register-container">
          <h3 className="lead">
            <i className="fas fa-user" /> Create Your Account
          </h3>
          <form className="form">
            <div className="form-group">
              <input type="text" placeholder="Name" name="name" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" name="email" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" name="password" />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
              />
            </div>
            <input type="submit" className="btn btn-primary w-full" value="Register" />
          </form>
          <p className="my-1 text-center">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </section>
    </>
  );
}
