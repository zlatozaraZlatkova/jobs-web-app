/* eslint-disable no-unused-vars */
import styles from "./Navigation.module.css";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../apiHooks/useAuth";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function Navigation() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {isDark, toggleTheme} = useContext(ThemeContext);
  const [serverError, setServerError] = useState(null);


  const { isAuthenticated, role, logoutAuthState } = useContext(AuthContext);
  const { logoutHandler, error } = useLogout();
  const isEmployee = role === "employee";

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


  const handleLogout = async () => {
    try {
      setServerError(null);
      const success = await logoutHandler();
      if (success && !error) {
        logoutAuthState();
        navigate("/");
      }
    } catch (err) {
      setServerError(err.message || "Failed to logout. Please try again.");
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
              checked={isDark}
              onChange={toggleTheme}
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
          <ul
            className={`${styles.navLinks} ${
              isMobileMenuOpen ? styles.active : ""
            }`}
          >
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/profile/catalog">Devs</Link>
            </li>

            {isAuthenticated ? (
              <>
                {isEmployee ? (
                  <>
                    <li>
                      <Link to="/profile/create">Create CV</Link>
                    </li>
                    <li>
                      <Link to="/profile">Dashboard</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/jobs/create">Add Job</Link>
                    </li>
                    <li>
                      <Link to="/company/profile">Dashboard</Link>
                    </li>
                  </>
                )}

                <li>
                  <button
                    onClick={handleLogout}
                    className={styles.loginBtn}
                    type="button"
                  >
                    Logout
                  </button>
                  {serverError && (
                    <div className="alert alert-danger">{serverError}</div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login" className={styles.loginBtn}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
