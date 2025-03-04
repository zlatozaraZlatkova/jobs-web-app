import { useState } from "react";
import { formatDate } from "../../../utils/formatDate";

export default function AddEducation() {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    fromDate: "",
    toDate: "",
    isCurrentStudy: false,
    description: "",
  });

  const [educations, setEducations] = useState([
    {
      id: 1,
      school: "SoftUni",
      degree: "Professional",
      fieldOfStudy: "JS Web Developer",
      fromDate: "2009-09-01",
      toDate: "",
      isCurrentStudy: true,
      description: "",
    },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEducation = {
      id: Date.now(),
      ...formData,
    };

    setEducations([...educations, newEducation]);

    setFormData({
      school: "",
      degree: "",
      fieldOfStudy: "",
      fromDate: "",
      toDate: "",
      isCurrentStudy: false,
      description: "",
    });
  };

  const handleEdit = (id) => {
    const educationToEdit = educations.find((edu) => edu.id === id);
    if (educationToEdit) {
      setFormData(educationToEdit);
      setEducations(educations.filter((edu) => edu.id !== id));
    }
  };

  const handleDelete = (id) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  return (
    <>
      {/* Education Form */}
      <div className="form-card">
        <h1 className="form-title">Add Your Education</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="required">School</label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="e.g. SoftUni"
              required
            />
          </div>
          <div className="form-group">
            <label className="required">Degree</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="e.g. Professional"
              required
            />
          </div>
          <div className="form-group">
            <label className="required">Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              placeholder="e.g. JS Web Developer"
              required
            />
          </div>
          <div className="form-group">
            <label className="required">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              disabled={formData.isCurrentStudy}
            />
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="current"
                name="isCurrentStudy"
                checked={formData.isCurrentStudy}
                onChange={handleChange}
              />
              <label htmlFor="current">I am currently studying here</label>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your course, achievements, and relevant projects..."
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-save">
              Save
            </button>
          </div>
        </form>

        {/* Table showing saved education */}
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
            {educations.map((education) => (
              <tr key={education.id}>
                <td>{education.school}</td>
                <td>{education.degree}</td>
                <td>{education.fieldOfStudy}</td>
                <td>
                  {formatDate(education.fromDate)} -{" "}
                  {education.isCurrentStudy
                    ? "Current"
                    : formatDate(education.toDate)}
                </td>
                <td className="action-cell">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(education.id)}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(education.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          <button className="back-button" type="button">
            ← Back
          </button>
          <button className="continue-button" type="button">
            Continue →
          </button>
        </div>
      </div>
    </>
  );
}
