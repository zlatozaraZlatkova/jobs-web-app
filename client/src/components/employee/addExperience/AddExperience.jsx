/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useForm } from "../../../apiHooks/useForm";
import { formatDate } from "../../../utils/formatDate";
import {
  useExperienceApi,
  useGetEmployeeProfile,
  useDeleteExperience,
} from "../../../apiHooks/useEmployee";

export default function AddExperience({ onBack, onComplete }) {
  const { submitExperience, isSubmittingExperience } = useExperienceApi();
  const { employee, refreshData, isLoading, error } = useGetEmployeeProfile();
  const { submitDelExp } = useDeleteExperience();

  const [serverError, setServerError] = useState(null);
  const [formErrors, setFormErrors] = useState(null);

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
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  };

  const validateForm = (formValues) => {
    if (
      !formValues.title &&
      !formValues.company &&
      !formValues.location &&
      !formValues.from &&
      !formValues.to &&
      !formValues.description
    ) {
      setFormErrors("All fields are required");
      return false;
    }

    if (!formValues.title) {
      setFormErrors("Current Position is required");
      return false;
    }
    if (formValues.title.length < 5) {
      setFormErrors("Current Position must be at least 5 characters");
      return false;
    }
    if (!formValues.company) {
      setFormErrors("Company name is required");
      return false;
    }
    if (formValues.company.length < 5) {
      setFormErrors("Company name must be at least 5 characters");
      return false;
    }
    if (!formValues.location) {
      setFormErrors("Location is required");
      return false;
    }
    if (formValues.location.length < 5) {
      setFormErrors("Location must be at least 5 characters");
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

    if (!formValues.from) {
      setFormErrors("Start date is required");
      return false;
    }

    if (!formValues.current) {
     
      if (!formValues.to) {
        setFormErrors("End date is required when not current");
        return false;
      }

      if (formValues.to < formValues.from) {
        setFormErrors("End date cannot be earlier than start date");
        return false;
      }
      
    }

    setFormErrors(null);
    return true;
  };

  const handleFormSubmit = async (formData) => {
    const today = new Date().toISOString().split("T")[0];
    setServerError(null);
    setFormErrors(null);

    if (!validateForm(formData)) {
      return;
    }

    try {
      const experienceInputData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        from: formData.from,
        to: formData.current ? today : formData.to,
        current: formData.current,
        description: formData.description || "",
      };

      const newExperience = await submitExperience(experienceInputData);
      //console.log("Response exp data", newExperience);

      if (newExperience) {
        refreshData();
        resetForm();
      }
    } catch (err) {
      setServerError(err.message || "Failed to save experience");
    }
  };

  const { formValues, changeHandler, submitHandler, resetForm } = useForm(
    initialValues,
    handleFormSubmit
  );

  const handleContinue = () => {
    if (!employee?.experience || employee.experience.length === 0) {
      setServerError("Please add at least one experience before continuing");
      return;
    }

    onComplete();
  };

  const onDeleteClickHandler = async (id) => {
    try {
      await submitDelExp(id);
      refreshData();
    } catch (error) {
      setServerError(error.message || "Failed to delete experience");
    }
  };

  return (
    <>
      {/* Experience Form */}
      <div className="form-card">
        <h1 className="form-title">Add Your Experience</h1>

        {formErrors && <div className="error-message">{formErrors}</div>}
        {!formErrors && serverError && (
          <div className="error-message">{serverError}</div>
        )}

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="required">Title</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={changeHandler}
              placeholder="e.g. Senior Frontend Developer"
              required
            />
          </div>
          {/* Other form fields... */}
          <div className="form-group">
            <label className="required">Company</label>
            <input
              type="text"
              name="company"
              value={formValues.company}
              onChange={changeHandler}
              placeholder="e.g. Oracle"
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formValues.location}
              onChange={changeHandler}
              placeholder="e.g. London"
            />
          </div>
          <div className="form-group">
            <label className="required">From Date</label>
            <input
              type="date"
              name="from"
              value={formValues.from}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label>To Date</label>
            <input
              type="date"
              name="to"
              value={formValues.to}
              onChange={changeHandler}
              disabled={formValues.current}
            />
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formValues.current}
                onChange={changeHandler}
              />
              <label htmlFor="current">I am currently working here</label>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={changeHandler}
              placeholder="Describe your roles and responsibilities..."
            />
          </div>
          <div className="button-group">
            <button
              type="submit"
              className="btn-save"
              disabled={isSubmittingExperience}
            >
              {isSubmittingExperience ? "Saving..." : "Save Experience"}
            </button>
          </div>
        </form>

        {/* Table showing saved experiences */}
        {isLoading ? (
          <div className="loading">Loading experiences...</div>
        ) : employee &&
          employee.experience &&
          employee.experience.length > 0 ? (
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
              {employee.experience.map((experience) => (
                <tr key={experience._id}>
                  <td>{experience.title}</td>
                  <td>{experience.company}</td>
                  <td>{experience.location}</td>
                  <td>
                    {formatDate(experience.from)} -{" "}
                    {experience.current ? "Present" : formatDate(experience.to)}
                  </td>
                  <td className="action-cell">
                    <button
                      className="btn-delete"
                      onClick={() => onDeleteClickHandler(experience._id)}
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="emptyState">
            <p>No experiences have been added yet.</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          <button
            className="back-button"
            type="button"
            onClick={() => onBack()}
          >
            ← Back
          </button>
          <button
            className="continue-button"
            type="button"
            disabled={isSubmittingExperience}
            onClick={handleContinue}
          >
            {isSubmittingExperience ? "Creating Experience..." : "Continue →"}
          </button>
        </div>
      </div>
    </>
  );
}
