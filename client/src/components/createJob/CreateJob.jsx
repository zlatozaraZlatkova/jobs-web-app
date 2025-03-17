import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../apiHooks/useForm";
import { useCreateJob } from "../../apiHooks/useJobs";
import styles from "./CreateJob.module.css";

export default function CreateJob() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const { isSubmittingJob, submitJob } = useCreateJob();

  const initialValues = {
    title: "",
    techStack: "react",
    type: "full-time",
    technologies: "frontend",
    description: "",
    location: "",
    salary: "Under $50K",
  };

  const handleFormSubmit = async (formData) => {
    try {
      console.log("Submitting job data:", formData);
      const jobData = {
        title: formData.title,
        techStack: formData.techStack, 
        type: formData.type,
        technologies: formData.technologies,
        description: formData.description,
        location: formData.location,
        salary: formData.salary,
      };

      const newJob = await submitJob(jobData);
      console.log("Response job data:", newJob);

      navigate(`/jobs/${newJob._id}`);
    } catch (err) {
      console.log("Error message:", err.message);
      setServerError(err.message);
      resetForm();
    }
  };

  const { formValues, changeHander, sumbitHandler, resetForm } = useForm(initialValues, handleFormSubmit);

  const clickCancelHandle = () => {
    resetForm();
  };

  return (
    <section className={styles.formSection}>
      <div className={styles.container}>
        <div className={styles.formCard}>
        {serverError && <div className="error-message">{serverError}</div>}
          <form onSubmit={sumbitHandler}>
            <h2 className={styles.formTitle}>Add Job</h2>

            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.formLabel}>
                Job Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={styles.formInput}
                placeholder="e.g. Senior Frontend Developer"
                required
                minLength="5"
                maxLength="150"
                value={formValues.title}
                onChange={changeHander}
              />
              <small className={styles.formHint}>
                Must be 5-150 characters
              </small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="techStack" className={styles.formLabel}>
                Tech Stack*
              </label>
              <select
                id="techStack"
                name="techStack"
                className={styles.formSelect}
                required
                value={formValues.techStack}
                onChange={changeHander}
              >
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="react">React</option>
                <option value="angular">Angular</option>
                <option value="vue">Vue</option>
                <option value="next.js">Next.js</option>
                <option value="typescript">TypeScript</option>
                <option value="java">Java</option>
                <option value=".net">.NET</option>
                <option value="php">PHP</option>
                <option value="python">Python</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="node.js">Node.js</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="type" className={styles.formLabel}>
                Job Type*
              </label>
              <select
                id="type"
                name="type"
                className={styles.formSelect}
                required
                value={formValues.type}
                onChange={changeHander}
              >
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="remote">Remote</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="technologies" className={styles.formLabel}>
                Technologies*
              </label>
              <select
                id="technologies"
                name="technologies"
                className={styles.formSelect}
                required
                value={formValues.technologies}
                onChange={changeHander}
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                className={styles.formTextarea}
                rows="4"
                placeholder="Add job duties, expectations, requirements, etc."
                required
                minLength="5"
                maxLength="3000"
                value={formValues.description}
                onChange={changeHander}
              ></textarea>
              <small className={styles.formHint}>
                Must be 5-3000 characters
              </small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location" className={styles.formLabel}>
                Location*
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className={styles.formInput}
                placeholder="e.g. San Francisco, CA or Remote"
                required
                value={formValues.location}
                onChange={changeHander}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="salary" className={styles.formLabel}>
                Salary*
              </label>
              <select
                id="salary"
                name="salary"
                className={styles.formSelect}
                required
                value={formValues.salary}
                onChange={changeHander}
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

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
                disabled={isSubmittingJob}
              >
                {isSubmittingJob ? "Adding Job..." : "Add Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
