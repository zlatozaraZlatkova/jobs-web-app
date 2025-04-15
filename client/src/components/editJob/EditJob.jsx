/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../apiHooks/useForm";
import { useEditJob, useFetchingInitialData } from "../../apiHooks/useJobs";
import styles from "../createJob/CreateJob.module.css";

export default function EditJob() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [serverError, setServerError] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const { isSubmittingJob, editJob, error } = useEditJob();
  const { initialJobData } = useFetchingInitialData(id);


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
    techStack: "react",
    type: "full-time",
    technologies: "frontend",
    description: "",
    location: "",
    salary: "Under $50K",
  };

  const validateForm = (formValues) => {

    if (!formValues.title && !formValues.description && !formValues.location) {
      setFormErrors("All fields are required");
      return false;
    }

    if (!formValues.title) {
      setFormErrors("Position is required");
      return false;
    }
    if (formValues.title.length < 5) {
      setFormErrors("Position must be at least 5 characters");
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

    if (!formValues.location) {
      setFormErrors("Location is required");
      return false;
    }
    if (formValues.location.length < 2) {
      setFormErrors("Location must be at least 2 characters");
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
      setServerError(null);

      const jobData = {
        title: formData.title,
        techStack: formData.techStack,
        type: formData.type,
        technologies: formData.technologies,
        description: formData.description,
        location: formData.location,
        salary: formData.salary,
      };

      const updatedJob = await editJob(jobData, id);

      navigate(`/jobs/${id}`);
    } catch (err) {
      setServerError(err.message);
      resetForm();
    }
  };

  const { formValues, setFormValues, changeHandler, submitHandler, resetForm } = useForm(
    initialValues,
    handleFormSubmit
  );

  useEffect(() => {
    if (initialJobData) {
      setFormValues({
        title: initialJobData.title || "",
        techStack: initialJobData.techStack || "react",
        type: initialJobData.type || "full-time",
        technologies: initialJobData.technologies || "frontend",
        description: initialJobData.description || "",
        location: initialJobData.location || "",
        salary: initialJobData.salary || "Under $50K",
      });
    }
  }, [initialJobData, setFormValues]);



  const clickCancelHandle = () => {
    navigate(`/jobs/${id}`);
  };

  return (
    <section className={styles.formSection}>
      <div className={styles.container}>
        <div className={styles.formCard}>

          {formErrors && <div className="error-message">{formErrors}</div>}
          {!formErrors && serverError && (
            <div className="error-message">{serverError}</div>
          )}

          <form onSubmit={submitHandler}>
            <h2 className={styles.formTitle}>Edit Job</h2>

            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.formLabel}>
                Job Position*
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                {isSubmittingJob ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
