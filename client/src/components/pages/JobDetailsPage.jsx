import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobDetails from "../jobDetails/JobDetails"; 
import NotFoundPage from "./NotFoundPage";
import { getJobById } from "../../api/jobsApi";
import { useDeleteJob } from "../../apiHooks/useJobs";

export default function JobDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { submitDelJob } = useDeleteJob();
  
  const [currentJob, setCurrentJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


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
    navigate(`/jobs/update/${id}`);
  }

  const onDeleteClickHandler = async (id) => {
    try {
      console.log(id);
      await submitDelJob(id);
      navigate("/jobs");
      
    } catch (error) {
      console.log("delete", error);
    }
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