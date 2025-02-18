export default function CreateProfile() {

  return (
    <>
      <div className="form-card">
        <h1 className="form-title">Create Your Professional Profile</h1>
        <form>
          <div className="form-grid">
            <div className="form-group">
              <label className="required">Full Name</label>
              <input type="text" placeholder="e.g. John Doe" />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input type="text" placeholder="e.g. Tech Solutions Inc." />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input type="url" placeholder="www.example.com" />
            </div>
            <div className="form-group">
              <label className="required">Location</label>
              <input type="text" placeholder="e.g. London, UK" />
            </div>
            <div className="form-group">
              <label className="required">Status</label>
              <input type="text" placeholder="e.g. Looking for opportunities" />
            </div>
            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input type="url" placeholder="www.linkedin.com/in/username" />
            </div>
            <div className="form-group form-grid-full">
              <label className="required">Skills</label>
              <input type="text" placeholder="eg. HTML, CSS, JavaScript, React" />
            </div>
            <div className="form-group form-grid-full">
              <label>Bio</label>
              <textarea
                placeholder="Tell us about yourself..."
                defaultValue={""}
              />
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className="create-profile-btn">
              Create Profile
            </button>
            {/* <button type="button" className="continue-button">
              Continue →
            </button> */}
          </div>
        </form>
      </div>
    </>
  );
}
