/* eslint-disable react/prop-types */
import styles from "./SearchBar.module.css";
import { useState, useEffect } from "react";
import { useForm } from "../../apiHooks/useForm";
import { useSearchJobs } from "../../apiHooks/useJobs";

export default function SearchBar({ onSearchComplete }) {
  const [displayError, setDisplayError] = useState(null);
  const { submitSearch, error } = useSearchJobs();
  
  useEffect(() => {
    if (error) {
      setDisplayError(error);
    }
  }, [error]);

  const initialValues = {
    position: "",
    location: "",
    salary: "",
  };

  const handleFormSubmit = async (formData) => {
    try {
      setDisplayError(null);
      const searchParams = {
        title: formData.title,
        location: formData.location,
        type: formData.type,
      };
      const result = await submitSearch(searchParams);
      console.log("Submit search params:", result);

      if (result && result.data && result.data.items) {
        onSearchComplete(result.data.items);
      }

    } catch (err) {
      setDisplayError(err);
    }
  };

  const { formValues, changeHander, sumbitHandler } = useForm(
    initialValues,
    handleFormSubmit
  );

  return (
    <>
     
        {displayError && <div className="error-message">{displayError}</div>}
        <form onSubmit={sumbitHandler} className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="text"
            name="title"
            value={formValues.title}
            onChange={changeHander}
            placeholder="Position"
          />
          <input
            className={styles.searchInput}
            type="text"
            name="location"
            value={formValues.location}
            onChange={changeHander}
            placeholder="Location"
          />
          <input
            className={styles.searchInput}
            type="text"
            name="type"
            value={formValues.type}
            onChange={changeHander}
            placeholder="Full-Time"
          />

          <button className={styles.submitBtn}>SEARCH BY STACK</button>
        </form>
      
    </>
  );
}
