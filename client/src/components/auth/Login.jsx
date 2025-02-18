import { Link } from "react-router-dom";

// todo use react icons

export default function Login() {
  return (
    <>
      <section className="container">
        <div  className="login-container">
        <h3 className="lead">
          <i className="fas fa-user" /> Sign Into Your Account
        </h3>
        <form className="form">
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" />
          </div>
          <input type="submit" className="btn btn-primary w-full" value="Login" />
        </form>
        <p className="my-1 text-center">
          Don&apos;t have an account? <Link to={"/register"}>Register</Link>
        </p>
        </div>
      </section> 
   
    </>
  );
}
