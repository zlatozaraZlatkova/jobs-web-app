import { useState } from "react";
import { formatDate } from "../../../utils/formatDate";

export default function AddExperience() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    fromDate: "",
    toDate: "",
    isCurrentJob: false,
    description: "",
  });

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Oracle",
      location: "London",
      fromDate: "2009-10-01",
      toDate: "",
      isCurrentJob: true,
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

    const newExperience = {
      id: Date.now(), 
      ...formData,
    };

    setExperiences([...experiences, newExperience]);

    setFormData({
      title: "",
      company: "",
      location: "",
      fromDate: "",
      toDate: "",
      isCurrentJob: false,
      description: "",
    });
  };

  const handleEdit = (id) => {
    const experienceToEdit = experiences.find((exp) => exp.id === id);
    if (experienceToEdit) {
      setFormData(experienceToEdit);
      setExperiences(experiences.filter((exp) => exp.id !== id));
    }
  };

  const handleDelete = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <>
      {/* Experience Form */}
      <div className="form-card">
        <h1 className="form-title">Add Your Experience</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="required">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Developer"
              required
            />
          </div>
          <div className="form-group">
            <label className="required">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Oracle"
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. London"
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
              disabled={formData.isCurrentJob}
            />
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="current"
                name="isCurrentJob"
                checked={formData.isCurrentJob}
                onChange={handleChange}
              />
              <label htmlFor="current">I am currently working here</label>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your roles and responsibilities..."
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-save">
              Save
            </button>
          </div>
        </form>

        {/* Table showing saved experiences */}
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
            {experiences.map((experience) => (
              <tr key={experience.id}>
                <td>{experience.title}</td>
                <td>{experience.company}</td>
                <td>{experience.location}</td>
                <td>
                  {formatDate(experience.fromDate)} -{" "}
                  {experience.isCurrentJob
                    ? "Present"
                    : formatDate(experience.toDate)}
                </td>
                <td className="action-cell">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(experience.id)}
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(experience.id)}
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
