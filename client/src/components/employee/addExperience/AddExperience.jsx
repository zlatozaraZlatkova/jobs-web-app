export default function AddExperience() {
  return (
    <>
      {/* Experience Form */}
      <div className="form-card">
        <h1 className="form-title">Add Your Experience</h1>

        <form>
          <div className="form-group">
            <label className="required">Title</label>
            <input type="text" placeholder="e.g. Senior Frontend Developer" />
          </div>
          <div className="form-group">
            <label className="required">Company</label>
            <input type="text" placeholder="e.g. Oracle" />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" placeholder="e.g. London" />
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
              <label htmlFor="current">I am currently working here</label>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Describe your roles and responsibilities..."
              defaultValue={""}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-save">
              Save
            </button>
          </div>
        </form>
        {/* Table showing saved experiences */}
        <table className="experience-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Period</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Senior Frontend Developer</td>
              <td>Oracle</td>
              <td>London</td>
              <td>Oct 2009 - Present</td>
              <td className="action-cell">
                <button className="btn-edit">Edit</button>
                <button className="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Add Another Experience Button */}
        <button className="add-experience-button">
          + Add Another Experience
        </button>
        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          <button className="back-button">← Back</button>
          <button className="continue-button">Continue →</button>
        </div>
      </div>
    </>
  );
}
