/* eslint-disable react/prop-types */
import styles from "./SearchBar.module.css";
import { useState, useEffect } from "react";
import { useForm } from "../../apiHooks/useForm";
import { useSearchJobs } from "../../apiHooks/useJobs";

export default function SearchBar({ onSearch }) {
  const [displayError, setDisplayError] = useState(null);
  const [formErrors, setFormErrors] = useState(null);

  const { submitSearch, error } = useSearchJobs();

  useEffect(() => {
    if (error) {
      setDisplayError(error);
    }
   
    if (formErrors) {
      const timer = setTimeout(() => {
        setFormErrors(null);
      }, 1000);
      
      return () => {
        clearTimeout(timer);
      };
    }

  }, [error, formErrors]);

  const initialValues = {
    title: "",
    location: "",
    type: "",
  };

  const validateForm = (formValues) => {
    if (!formValues.title && !formValues.location && !formValues.type) {
      setFormErrors("Please fill at least one search field");
      return false;
    }

    if (formValues.title && formValues.title > 5) {
      setFormErrors("Position must be at least 5 characters");
      return false;
    }

    if (
      formValues.type &&
      !["full-time", "part-time", "remote"].includes(formValues.type)
    ) {
      setFormErrors("Type must be one of: Full-Time, Part-Time, Remote");
      return false;
    }

    setFormErrors(null);
    return true;
  };

  const handleFormSubmit = async (formData) => {
    setDisplayError(null);
    setFormErrors(null);

    if (!validateForm(formData)) {
      return;
    }

    try {
      const searchParams = {
        title: formData.title || "",
        location: formData.location || "",
        type: formData.type || "",
      };
      const result = await submitSearch(searchParams);
      console.log("Submit search params:", result);

      if (result && result.data && result.data.items) {
        onSearch(result.data.items);
      }
    } catch (err) {
      setDisplayError(err);
    }
  };

  const { formValues, changeHandler, submitHandler } = useForm(
    initialValues,
    handleFormSubmit
  );

  return (
    <>
     {formErrors ? (
        <div className="error-message">{formErrors}</div>
      ) : (
        displayError && <div className="error-message">{displayError}</div>
      )}

      <form onSubmit={submitHandler} className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          name="title"
          value={formValues.title}
          onChange={changeHandler}
          placeholder="Position"
        />
  
        <input
          className={styles.searchInput}
          type="text"
          name="location"
          value={formValues.location}
          onChange={changeHandler}
          placeholder="Location"
        />
    
        <input
          className={styles.searchInput}
          type="text"
          name="type"
          value={formValues.type}
          onChange={changeHandler}
          placeholder="Full-Time"
        />
    
        <button className={styles.submitBtn}>SEARCH BY STACK</button>
      </form>
    </>
  );
}
