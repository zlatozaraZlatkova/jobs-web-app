import JobCard from "./jobCard/JobCard";

export default function FeaturedJobSection() {
    return(<>
          <section className="featured-jobs">
              <div className="container">
                <h2 className="section-title">Featured Positions</h2>
                <div className="jobs-grid">
                  {/* Job Card 1 */}
                  <JobCard />
                  {/* Job Card 2 */}
                  <JobCard />
                  {/* <article className="job-card">
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
                  </article> */}

                  {/* Job Card 3 */}
                  <JobCard />
                  {/* <article className="job-card">
                    <span className="job-type">Remote</span>
                    <h3 className="job-title">React.js Developer</h3>
                    <p className="job-description">
                      Are you passionate about front-end development? Join our
                      team in vibrant Brooklyn, NY, and work on exciting
                      projects that make a difference... More
                    </p>
                    <div className="job-details">
                      <div className="job-location">
                        <i className="fa-solid fa-location-dot" />
                        <span>Brooklyn, NY</span>
                      </div>
                      <div className="job-salary">$70K - $80K / Year</div>
                      <a href="job.html" className="job-link">
                        Read More
                        <i className="fas fa-arrow-right" />
                      </a>
                    </div>
                  </article> */}
                  
                 
                </div>
                <div className="text-center">
                  <a href="jobs.html" className="btn btn-primary">
                    Explore More
                  </a>
                </div>
              </div>
            </section>
    </>)
}