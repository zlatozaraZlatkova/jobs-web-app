/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { formatDate } from "../../../utils/formatDate";
import { useForm } from "../../../apiHooks/useForm";
import { useEducationApi, useGetEmployeeProfile, useDeleteEducation } from "../../../apiHooks/useEmployee";

export default function AddEducation({ onBack, onComplete }) {
  const { employee, refreshData, isLoading } = useGetEmployeeProfile();
  const { submitEducation, isSubmittingEducation, error } = useEducationApi();
  const { submitDelEduc } = useDeleteEducation();
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
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  };

  const validateForm = (formValues) => {

    if (!formValues.school && !formValues.degree && !formValues.fieldOfStudy &&
      !formValues.from && !formValues.to && ! formValues.description
    ) {
      setFormErrors("All fields are required");
      return false;
    }

    if (!formValues.school) {
      setFormErrors("School is required");
      return false;
    }
    if (formValues.school.length < 5) {
      setFormErrors("School name must be at least 5 characters");
      return false;
    }
    if (!formValues.degree) {
      setFormErrors("Degree is required");
      return false;
    }
    if (formValues.degree.length < 5) {
      setFormErrors("Degree must be at least 5 characters");
      return false;
    }
    if (!formValues.fieldOfStudy) {
      setFormErrors("Field of study is required");
      return false;
    }
    if (formValues.fieldOfStudy.length < 5) {
      setFormErrors("Field of study must be at least 5 characters");
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
    const today = new Date().toISOString().split('T')[0];
    setServerError(null);
    setFormErrors(null);

    if (!validateForm(formData)) {
      return;
    }

    try {
   
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

      if (newEducation) {
        refreshData();
        resetForm();
      }
    } catch (err) {
      setServerError(err.message || "Failed to save education");
    }
  };

  const { formValues, changeHandler, submitHandler, resetForm } = useForm(
    initialValues,
    handleFormSubmit
  );

  const handleContinue = () => {
    if (!employee?.education || employee.education.length === 0) {
      setServerError("Please add at least one education before continuing");
      return;
    }

    onComplete();
  };

  const onDeleteClickHandler = async (id) => {
    try {

      await submitDelEduc(id);
      refreshData();

    } catch (error) {
      setServerError(error.message || "Failed to delete education");
    }
  }




  return (
    <>
      {/* Education Form */}
      <div className="form-card">
        <h1 className="form-title">Add Your Education</h1>
        
        {formErrors && <div className="error-message">{formErrors}</div>}
          {!formErrors && serverError && (
            <div className="error-message">{serverError}</div>
          )}
          
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
