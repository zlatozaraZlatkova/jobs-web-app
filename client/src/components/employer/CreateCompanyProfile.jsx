/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../apiHooks/useForm";
import { useCreateCompanyProfile } from "../../apiHooks/useEmployer";

export default function CreateCompanyProfile() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const { isSubmittingProfile, submitCompanyProfile } = useCreateCompanyProfile();

  const initialValues = {
    companyName: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  };

  const handleFormSubmit = async (formData) => {
    try {
      console.log("Submitting company data:", formData);

      const companyData = {
        companyName: formData.companyName,
        description: formData.description,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
      };

      const newCompany = await submitCompanyProfile(companyData);
      console.log("Response company data:", newCompany);

      navigate("/");
    } catch (err) {
      console.log("Error creating company profile:", err);
      setServerError(err.message || "Failed to create company profile");
    }
  };

  const { formValues, changeHander, sumbitHandler, resetForm } = useForm(initialValues, handleFormSubmit);

  const clickCancelHandle = () => {
    resetForm();
  };

  return (
    <>
      <form onSubmit={sumbitHandler}>
        {/* Company Information */}
        {serverError && <div className="error-message">{serverError}</div>}
        <div className="form-section">
          <h2 className="section-title">Company Information</h2>
          <div className="form-group">
            <label className="required">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formValues.companyName}
              onChange={changeHander}
              placeholder="e.g. Dolor Cloud"
              required
            />
            <p className="input-hint">This name will be displayed publicly</p>
          </div>
          <div className="form-group">
            <label className="required">Description</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={changeHander}
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
                value={formValues.contactEmail}
                onChange={changeHander}
                placeholder="e.g. contact@company.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="required">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={formValues.contactPhone}
                onChange={changeHander}
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
            onClick={clickCancelHandle}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button button-primary"
            disabled={isSubmittingProfile}
          >
            {isSubmittingProfile ? "Creating..." : "Create Profile"}
          </button>
        </div>
      </form>
    </>
  );
}
