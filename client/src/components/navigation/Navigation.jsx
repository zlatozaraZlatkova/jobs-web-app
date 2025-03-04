/* eslint-disable no-unused-vars */
import styles from "./Navigation.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isEmployee, setIsEmployee] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
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
          <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ""}`}
          >
            <li><Link to="/jobs">Tech Jobs</Link></li>
            <li><Link to="/profiles">Hire Talent</Link></li>
            <li><Link to="/posts">Forum</Link></li>

            {isLoggedIn ? (
              <>
                {isEmployee ? (
                  <>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/profile/create">Create Profile</Link></li>
                  </>
                ) : (
                    <>
                     <li><Link to="/company/profile">Admin Profile</Link></li>
                     <li><Link to="/company/profile/create">Create Company</Link></li>
                    </>
                  )}

                <li>
                  <button onClick={handleLogout} className={styles.loginBtn} type="button">
                    Logout
                  </button>
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
