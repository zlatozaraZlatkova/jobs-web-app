import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import JobDetails from "../jobDetails/JobDetails";
import { useDeleteJob } from "../../apiHooks/useJobs";
import { useGetJobDetails } from "../../apiHooks/useJobs";

export default function JobDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { submitDelJob } = useDeleteJob();
  const { currentJob, isLoading, error } = useGetJobDetails(id);
  const [displayError, setDisplayError] = useState(null);



  useEffect(() => {
    if (error) {
      setDisplayError(error);
    }
  }, [error]);

  const onEditClickHandler = (id) => {
    navigate(`/jobs/update/${id}`);
  };

  const onDeleteClickHandler = async (id) => {
    try {
      await submitDelJob(id);
      navigate("/jobs");
    } catch (err) {
      setDisplayError(err);
    }
  };

  return (
    <>
     {displayError && <div className="error-message">{displayError}</div>}
    
    {isLoading ? (
      <div>Loading job details...</div>
    ) : !currentJob ? (
      <Navigate to="/not-found" replace />
    ) : (
      <JobDetails 
        currentJob={currentJob}
        onEditClick={onEditClickHandler}
        onDeleteClick={onDeleteClickHandler} 
      />
    )}
    </>
  );
}
