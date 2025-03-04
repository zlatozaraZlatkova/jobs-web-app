import { useState } from 'react';

export default function CreateCompanyProfile() {

  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    contactEmail: '',
    contactPhone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

  };

  const handleCancel = () => {
    setFormData({
      companyName: '',
      description: '',
      contactEmail: '',
      contactPhone: ''
    });
    
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Company Information */}
        <div className="form-section">
          <h2 className="section-title">Company Information</h2>
          <div className="form-group">
            <label className="required">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Dolor Cloud"
              required
            />
            <p className="input-hint">This name will be displayed publicly</p>
          </div>
          <div className="form-group">
            <label className="required">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your company, its mission, and key offerings..."
              required
            />
            <p className="input-hint">
              A clear description helps potential clients understand your
              business
            </p>
          </div>
        </div>
        {/* Contact Information */}
        <div className="form-section">
          <h2 className="section-title">Contact Information</h2>
          <div className="contact-grid">
            <div className="form-group">
              <label className="required">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="e.g. contact@company.com"
                required
              />

            </div>
            <div className="form-group">
              <label className="required">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="e.g. 555-555-5555"
                required
              />
            </div>
          </div>
        </div>
        {/* Button Group */}
        <div className="button-group">
          <button 
            type="button" 
            className="button button-secondary"
            onClick={handleCancel}
          >
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