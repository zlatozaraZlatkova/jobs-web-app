/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "../../../apiHooks/useForm";
import { formatDate } from "../../../utils/formatDate";
import { useExperienceApi, useGetEmployeeProfile, useDeleteExperience } from "../../../apiHooks/useEmployee";


export default function AddExperience({ onBack, onComplete }) {
  const { submitExperience, isSubmittingExperience } = useExperienceApi();
  const { employee, refreshData, isLoading } = useGetEmployeeProfile();
  const { submitDelExp } =useDeleteExperience();

  const [serverError, setServerError] = useState(null);

  const initialValues = {
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  };

  const handleFormSubmit = async (formData) => {
    const today = new Date().toISOString().split('T')[0];

    try {
      setServerError(null);

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
      console.log("Response exp data", newExperience);

      if (newExperience) {
        refreshData();
        resetForm();
      }

    } catch (err) {
      console.error("Full error:", err);
      setServerError(err.message || "Failed to save experience");
    }
  };

  const { formValues, changeHander, sumbitHandler, resetForm } = useForm(
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
      console.log("delete", error);
    }
  }


  return (
    <>
      {/* Experience Form */}
      <div className="form-card">
        <h1 className="form-title">Add Your Experience</h1>
        {serverError && <div className="error-message">{serverError}</div>}
        <form onSubmit={sumbitHandler}>
          <div className="form-group">
            <label className="required">Title</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={changeHander}
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
              onChange={changeHander}
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
              onChange={changeHander}
              placeholder="e.g. London"
            />
          </div>
          <div className="form-group">
            <label className="required">From Date</label>
            <input
              type="date"
              name="from"
              value={formValues.from}
              onChange={changeHander}
              required
            />
          </div>
          <div className="form-group">
            <label>To Date</label>
            <input
              type="date"
              name="to"
              value={formValues.to}
              onChange={changeHander}
              disabled={formValues.current}
            />
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formValues.current}
                onChange={changeHander}
              />
              <label htmlFor="current">I am currently working here</label>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={changeHander}
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
        ) : employee && employee.experience && employee.experience.length > 0 ? (
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
                    {experience.current 
                      ? "Present" 
                      : formatDate(experience.to)}
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