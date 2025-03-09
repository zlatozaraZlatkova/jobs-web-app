import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobDetails from "../jobDetails/JobDetails"; 
import NotFoundPage from "./NotFoundPage";

export default function DetailsPage() {
  const [currentJob, setCurrentJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        console.log(data)

        if(data) {
          setCurrentJob(data);
        }else {
          setCurrentJob(null);
        }
        
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