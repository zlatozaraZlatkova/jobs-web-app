/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { formatDate } from "../../../utils/formatDate";
import { useForm } from "../../../apiHooks/useForm";
import { useEducationApi, useGetEmployeeProfile, useDeleteEducation } from "../../../apiHooks/useEmployee";

export default function AddEducation({ onBack, onComplete }) {
  const { employee, refreshData, isLoading } = useGetEmployeeProfile();
  const { submitEducation, isSubmittingEducation, error } = useEducationApi();
  const { submitDelEduc } = useDeleteEducation();
  const [displayError, setDisplayError] = useState(null);

  const initialValues = {
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  };

  useEffect(() => {
    if (error) {
      setDisplayError(error);
    }
  }, [error]);

  const handleFormSubmit = async (formData) => {
    const today = new Date().toISOString().split('T')[0];
    try {
      setDisplayError(null);

      const educationInputData = {
        school: formData.school,
        degree: formData.degree,
        fieldOfStudy: formData.fieldOfStudy,
        from: formData.from,
        to: formData.current ? today : formData.to,
        current: formData.current,
        description: formData.description || "",
      };

      const newEducation = await submitEducation(educationInputData);
      console.log("Response education data", newEducation);

      if (newEducation) {
        refreshData();
        resetForm();
      }
    } catch (err) {
      setDisplayError(err.message || "Failed to save education");
    }
  };

  const { formValues, changeHandler, submitHandler, resetForm } = useForm(
    initialValues,
    handleFormSubmit
  );

  const handleContinue = () => {
    if (!employee?.education || employee.education.length === 0) {
      setDisplayError("Please add at least one education before continuing");
      return;
    }

    onComplete();
  };

  const onDeleteClickHandler = async (id) => {
    try {

      await submitDelEduc(id);
      refreshData();

    } catch (error) {
      setDisplayError(error.message || "Failed to delete education");
    }
  }




  return (
    <>
      {/* Education Form */}
      <div className="form-card">
        <h1 className="form-title">Add Your Education</h1>
        {displayError && <div className="error-message">{displayError}</div>}
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="required">School</label>
            <input
              type="text"
              name="school"
              value={formValues.school}
              onChange={changeHandler}
              placeholder="e.g. SoftUni"
              required
            />
          </div>
          <div className="form-group">
            <label className="required">Degree</label>
            <input
              type="text"
              name="degree"
              value={formValues.degree}
              onChange={changeHandler}
              placeholder="e.g. Professional"
              required
            />
          </div>
          <div className="form-group">
            <label className="required">Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formValues.fieldOfStudy}
              onChange={changeHandler}
              placeholder="e.g. JS Web Developer"
              required
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
              <label htmlFor="current">I am currently study here</label>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={changeHandler}
              placeholder="Describe your course, achievements, and relevant projects..."
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-save"
              disabled={isSubmittingEducation}
            >
              {isSubmittingEducation ? "Saving..." : "Save Education"}
            </button>
          </div>
        </form>

        {/* Table showing saved education */}
        {isLoading ? (
          <div className="loading">Loading education...</div>
        ) : employee &&
          employee.education &&
          employee.education.length > 0 ? (
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
              {employee.education.map((educ) => (
                <tr key={educ._id}>
                  <td>{educ.school}</td>
                  <td>{educ.degree}</td>
                  <td>{educ.fieldOfStudy}</td>
                  <td>
                    {formatDate(educ.from)} -{" "}
                    {educ.current
                      ? "Current"
                      : formatDate(educ.to)}
                  </td>
                  <td className="action-cell">
                    <button
                      className="btn-delete"
                      onClick={() => onDeleteClickHandler(educ._id)}
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
            <p>No education have been added yet.</p>
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
            onClick={handleContinue}
            disabled={isSubmittingEducation}
          >
            {isSubmittingEducation ? "Creating Education..." : "Continue →"}
          </button>
        </div>
      </div>
    </>
  );
}
