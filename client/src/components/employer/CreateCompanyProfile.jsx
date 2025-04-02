/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../apiHooks/useForm";
import { useCreateCompanyProfile } from "../../apiHooks/useEmployer";

export default function CreateCompanyProfile() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const { isSubmittingProfile, submitCompanyProfile, error } = useCreateCompanyProfile();

  useEffect(() => {
    if (error) {
      setServerError(error);
      const timer = setTimeout(() => {
        setServerError(null);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  useEffect(() => {
    if (formErrors) {
      const timer = setTimeout(() => {
        setFormErrors(null);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [formErrors]);


  const initialValues = {
    companyName: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  };

  const validateForm = (formValues) => {
    const regexEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!formValues.companyName && !formValues.description && !formValues.contactEmail && !formValues.contactPhone) {
      setFormErrors("All fields are required");
      return false;
    }

    if (!formValues.companyName) {
      setFormErrors("Company name is required");
      return false;
    }
    if (formValues.companyName.length < 5) {
      setFormErrors("Company Name must be at least 5 characters");
      return false;
    }

    if (!formValues.description) {
      setFormErrors("Description is required");
      return false;
    }
    if (formValues.description.length < 5) {
      setFormErrors("Description must be at least 5 characters");
      return false;
    }
    if (!formValues.contactEmail) {
      setFormErrors("Email is required");
      return false;
    }

    if (!regexEmail.test(formValues.contactEmail)) {
      setFormErrors("Please enter a valid email address");
      return false;
    }
    if (!formValues.contactPhone) {
      setFormErrors("Phone is required");
      return false;
    }

    setFormErrors(null);
    return true;
  };




  const handleFormSubmit = async (formData) => {
    setServerError(null);
    setFormErrors(null);

    if (!validateForm(formData)) {
      return;
    }

    try {

      const companyData = {
        companyName: formData.companyName,
        description: formData.description,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
      };

      const newCompany = await submitCompanyProfile(companyData);
      //console.log("Response company data:", newCompany);

      navigate("/");
    } catch (err) {
      setServerError(err.message);

    }
  };

  const { formValues, changeHandler, submitHandler, resetForm } = useForm(initialValues, handleFormSubmit);

  const clickCancelHandle = () => {
    resetForm();
  };

  return (
    <>
      <form onSubmit={submitHandler}>

        {formErrors && <div className="error-message">{formErrors}</div>}
        {!formErrors && serverError && (
          <div className="error-message">{serverError}</div>
        )}

        {/* Company Information */}
        <div className="form-section">
          <h2 className="section-title">Company Information</h2>
          <div className="form-group">
            <label className="required">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formValues.companyName}
              onChange={changeHandler}
              placeholder="e.g. Dolor Cloud"
              required
              minLength="5"
              maxLength="30"
            />
            <p className="input-hint">This name will be displayed publicly</p>
          </div>
          <div className="form-group">
            <label className="required">Description</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={changeHandler}
              placeholder="Describe your company, its mission, and key offerings..."
              required
              minLength="5"
              maxLength="3000"
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
