/* eslint-disable no-unused-vars */
import styles from "./Navigation.module.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../apiHooks/useAuth";
import { AuthContext } from "../../contexts/AuthContext";


export default function Navigation() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [serverError, setServerError] = useState(null);

  const { isAuthenticated, email, role } = useContext(AuthContext);
  const { logoutHandler } = useLogout();
  const isEmployee = role === "employee";

  const handleLogout = async () => {
    try {
      const success = await logoutHandler();
      navigate("/");

    } catch (err) {
      console.log("Logout failed:", err);
      setServerError("Failed to logout. Please try again.");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navLeft}>
          <h1>
            <Link to="/">
              <span className="braces left-brace">{"{"}</span>
              JobLink
              <span className="braces right-brace">{"}"}</span>
            </Link>
          </h1>
        </div>

        <div className={styles.navRight}>
          {/* Theme Toggle */}
          <label className={styles.themeToggle} title="Toggle dark mode">
            <input
              type="checkbox"
              id="theme-toggle"
              aria-label="Toggle dark mode"
            />
            <span className={styles.slider} />
          </label>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuBtn}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Navigation Links */}
          <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ""}`}>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/profile/catalog">Devs</Link></li>

            {isAuthenticated ? (
              <>
                {isEmployee ? (
                  <>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/profile/create">Create CV</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/jobs/create">Add Job</Link></li>
                    <li><Link to="/company/profile">Daschboard</Link></li>
                  </>
                )}

                <li>
                  <button onClick={handleLogout} className={styles.loginBtn} type="button">
                    Logout
                  </button>
                  {serverError && (
                    <div className="alert alert-danger">{serverError}</div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login" className={styles.loginBtn}>Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
