export default function CreateCompanyProfile() {
  return (
    <>
      <form>
        {/* Company Information */}
        <div className="form-section">
          <h2 className={styles.sectionTitle}>Company Information</h2>
          <div className="form-group">
            <label className="required">Company Name</label>
            <input type="text" placeholder="e.g. Dolor Cloud" required="" />
            <p className="input-hint">This name will be displayed publicly</p>
          </div>
          <div className="form-group">
            <label className="required">Description</label>
            <textarea
              placeholder="Describe your company, its mission, and key offerings..."
              required=""
              defaultValue={""}
            />
            <p className="input-hint">
              A clear description helps potential clients understand your
              business
            </p>
          </div>
        </div>
        {/* Contact Information */}
        <div className="form-section">
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <div className="contact-grid">
            <div className="form-group">
              <label className="required">Contact Email</label>
              <input
                type="email"
                placeholder="e.g. contact@company.com"
                required=""
              />
            </div>
            <div className="form-group">
              <label className="required">Contact Phone</label>
              <input type="tel" placeholder="e.g. 555-555-5555" required="" />
            </div>
          </div>
        </div>
        {/* Button Group */}
        <div className="button-group">
          <button type="button" className="button button-secondary">
            Cancel
          </button>
          <button type="submit" className="button button-primary">
            Create Profile
          </button>
        </div>
      </form>
    </>
  );
}
