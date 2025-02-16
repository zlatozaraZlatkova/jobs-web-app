export default function Navigation() {
    return(
        <>
         <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-left">
            <h1>
              <a href="index.html">
                <span className="braces left-brace">{"{"}</span>
                JobLink
                <span className="braces right-brace">{"}"}</span>
              </a>
            </h1>
          </div>
          <div className="nav-right">
            <label className="theme-toggle" title="Toggle dark mode">
              <input
                type="checkbox"
                id="theme-toggle"
                aria-label="Toggle dark mode"
              />
              <span className="slider" />
            </label>
            <button className="mobile-menu-btn" aria-label="Toggle menu">
              <span />
              <span />
              <span />
            </button>
            <ul className="nav-links">
              <li>
                <a href="jobs.html">Tech Jobs</a>
              </li>
              <li>
                <a href="profiles.html">Hire Talent</a>
              </li>
              <li>
                <a href="post.html">Forum</a>
              </li>
              <li>
                <a href="register.html">Register</a>
              </li>
              <li>
                <button className="login-btn">Login</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        </>
    )
}