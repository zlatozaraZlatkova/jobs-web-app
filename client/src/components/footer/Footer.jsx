export default function Footer() {
    return(
        <>
             <footer className="footer">
                  <div className="footer-container">
                    <a href="#" className="logo-link">
                      <div className="logo-icon">
                        <span>
                          {"{"}...{"}"}
                        </span>
                        {/* <i class="fas fa-code"></i> */}
                      </div>
                    </a>
                    <div className="copyright">© 2025 All Rights Reserved</div>
                    <div className="social-links">
                      <a href="#" className="social-link" aria-label="Twitter">
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-link"
                        aria-label="Instagram"
                      >
                        <i className="fab fa-instagram" />
                      </a>
                      <a href="#" className="social-link" aria-label="YouTube">
                        <i className="fab fa-youtube" />
                      </a>
                      <a href="#" className="social-link" aria-label="GitHub">
                        <i className="fab fa-github" />
                      </a>
                      <a href="#" className="social-link" aria-label="LinkedIn">
                        <i className="fab fa-linkedin" />
                      </a>
                    </div>
                  </div>
                </footer>
        </>
    )
}