export default function AddEducation() {
  return (
    <>
      <>
        {/* Education Form */}
        <div className="form-card">
          <h1 className="form-title">Add Your Education</h1>

          <form>
            <div className="form-group">
              <label className="required">School</label>
              <input type="text" placeholder="e.g. SoftUni" />
            </div>
            <div className="form-group">
              <label className="required">Degree</label>
              <input type="text" placeholder="e.g. Professional" />
            </div>
            <div className="form-group">
              <label className="required">Field of Study</label>
              <input type="text" placeholder="e.g. JS Web Developer" />
            </div>
            <div className="form-group">
              <label className="required">From Date</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>To Date</label>
              <input type="date" />
              <div className="checkbox-group">
                <input type="checkbox" id="current" />
                <label htmlFor="current">I am currently studying here</label>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Describe your course, achievements, and relevant projects..."
                defaultValue={""}
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn-save">
                Save
              </button>
            </div>
          </form>
          {/* Table showing saved education */}
          <table className="education-table">
            <thead>
              <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Field of Study</th>
                <th>Period</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SoftUni</td>
                <td>Professional</td>
                <td>JS Web Developer</td>
                <td>Sep 2009 - Current</td>
                <td className="action-cell">
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          {/* Add Another Education Button */}
          <button className="add-education-button">
            + Add Another Education
          </button>
          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            <button className="back-button">← Back</button>
            <button className="continue-button">Continue →</button>
          </div>
        </div>
      </>
    </>
  );
}
