export default function SearchBar() {
    return(
        <>
                <section className="search-section">
          <h1>GET HIRED &amp; BUILD A STRONG TEAM</h1>
          <p>Advance your career and build a strong, successful team.</p>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Position"
            />
            <input
              type="text"
              className="search-input"
              placeholder="Location"
            />
            <input type="text" className="search-input" placeholder="Salary" />

            <button className="submit-btn">SEARCH BY STACK</button>
          </div>
        </section>
        </>
    )
}