import { useState } from "react";

export default function CreateProfile() {

  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    website: "",
    location: "",
    status: "",
    linkedinProfile: "",
    skills: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form data submitted:", formData);
  };


  
  return (
    <>
      <div className="form-card">
        <h1 className="form-title">Create Your Professional Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="required">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
              />
              
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Tech Solutions Inc."
              />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="www.example.com"
              />
             
            </div>
            <div className="form-group">
              <label className="required">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. London, UK"
              />
            
            </div>
            <div className="form-group">
              <label className="required">Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="e.g. Looking for opportunities"
              />
              
            </div>
            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="url"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleChange}
                placeholder="www.linkedin.com/in/username"
              />
            
            </div>
            <div className="form-group form-grid-full">
              <label className="required">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="eg. HTML, CSS, JavaScript, React"
              />
            
            </div>
            <div className="form-group form-grid-full">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
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
