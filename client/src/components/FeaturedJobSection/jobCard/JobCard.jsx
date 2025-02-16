export default function JobCard() {
    return(
        <>
           <article className="job-card">
                    <span className="job-type">Remote</span>
                    <h3 className="job-title">Front-End Engineer (React)</h3>
                    <p className="job-description">
                      Join our team as a Front-End Developer in sunny Miami, FL.
                      We are looking for a motivated individual with a
                      passion... More
                    </p>
                    <div className="job-details">
                      <div className="job-location">
                        <i className="fa-solid fa-location-dot" />
                        <span>Miami, FL</span>
                      </div>
                      <div className="job-salary">$70K - $80K / Year</div>
                      <a href="job.html" className="job-link">
                        Read More
                        <i className="fas fa-arrow-right" />
                      </a>
                    </div>
                  </article>
        </>
    )
}