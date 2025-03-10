import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobDetails from "../jobDetails/JobDetails"; 
import NotFoundPage from "./NotFoundPage";
import { getJobById } from "../../api/jobsApi";

export default function JobDetailsPage() {
  const [currentJob, setCurrentJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const job = await getJobById(id);
        console.log("All fetched job by id", job);

        if(!job) {
          setCurrentJob(null);
          return;
        }

        setCurrentJob(job);
        
      } catch (err) {
        console.error("Error fetching current job data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const onEditClickHandler = (id) => {
    console.log(id)
  }
  const onDeleteClickHandler = (id) => {
    console.log(id)
  }

  return (
    <>
      {isLoading ? (
        <div>Loading job details...</div>
      ) : !currentJob ? (
        <NotFoundPage/>
      ) : (
        
         <JobDetails 
         currentJob={currentJob}
         onEditClick={onEditClickHandler}
         onDeleteClick={onDeleteClickHandler} />
       
      )}
    </>
  );
}