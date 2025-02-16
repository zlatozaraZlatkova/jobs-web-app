export default function CategoryCard() {
  return (
    <>
      <div className="stats-container">
        <div className="stats-header">
          <span className="keyword">const</span>
          <span className="object-name">BackendDevelopment</span>
          <span className="total-count">= {"{"}</span>
          {/* <span class="circle-count">600</span> */}
        </div>
        <div className="stats-content">
          <div className="stats-row">
            <div className="stats-item">
              <i className="fab fa-java tech-icon" />
              <span className="property-name">Java:</span>
              <span className="count">156</span>
            </div>
            <div className="stats-item">
              <i className="fab fa-microsoft tech-icon" />
              <span className="property-name">.NET:</span>
              <span className="count">128</span>
            </div>
          </div>
          <div className="stats-row">
            <div className="stats-item">
              <i className="fab fa-php tech-icon" />
              <span className="property-name">PHP:</span>
              <span className="count">51</span>
            </div>
          </div>
          <div className="stats-row">
            <div className="stats-item full-width">
              <i className="fas fa-microchip tech-icon" />
              <span className="property-name">C_Cpp_Embedded:</span>
              <span className="count">70</span>
            </div>
          </div>
          <div className="stats-row">
            <div className="stats-item">
              <i className="fab fa-python tech-icon" />
              <span className="property-name">Python:</span>
              <span className="count">75</span>
            </div>
            <div className="stats-item">
              <i className="fas fa-gem tech-icon" />
              <span className="property-name">Ruby:</span>
              <span className="count">1</span>
            </div>
          </div>
          <div className="stats-row">
            <div className="stats-item">
              <i className="fab fa-golang tech-icon" />
              <span className="property-name">Go:</span>
              <span className="count">23</span>
            </div>
            <div className="stats-item">
              <i className="fab fa-node-js tech-icon" />
              <span className="property-name">Node_js:</span>
              <span className="count">71</span>
            </div>
          </div>
        </div>
        <div className="stats-footer">{"}"}</div>
        <a href="job.html" className="job-link">
          See More
          <i className="fas fa-arrow-right" />
        </a>
      </div>

      {/*  <div className="stats-container">
                  <div className="stats-header">
                    <span className="keyword">const</span>
                    <span className="object-name">FrontendDevelopment</span>
                    <span className="total-count">= {"{"}</span>
                    <span class="circle-count green">262</span> 
                    </div>
                    <div className="stats-content">
                      <div className="stats-row">
                        <div className="stats-item full-width">
                          <i className="fab fa-js tech-icon js-icon" />
                          <span className="property-name">JavaScript:</span>
                          <span className="count">257</span>
                        </div>
                      </div>
                      <div className="stats-row">
                        <div className="stats-item">
                          <i className="fab fa-react tech-icon" />
                          <span className="property-name">React:</span>
                          <span className="count">113</span>
                        </div>
                        <div className="stats-item">
                          <i className="fab fa-angular tech-icon" />
                          <span className="property-name">Angular:</span>
                          <span className="count">65</span>
                        </div>
                      </div>
                      <div className="stats-row">
                        <div className="stats-item">
                          <i className="fab fa-vuejs tech-icon" />
                          <span className="property-name">Vue_js:</span>
                          <span className="count">14</span>
                        </div>
                      </div>
                    </div>
                    <div className="stats-footer">{"}"}</div>
                    <a href="job.html" className="job-link">
                      See More
                      <i className="fas fa-arrow-right" />
                    </a>
                  </div>
 */}
    </>
  );
}
