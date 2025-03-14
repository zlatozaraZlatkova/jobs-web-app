import JobsListSection from "../jobsListSection/JobsListSection";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { createPageURLParams } from "../../utils/createPageURLParams";


export default function JobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageInUrl = parseInt(searchParams.get('page') || '1');
  
  useEffect(() => {
    if (currentPage !== pageInUrl) {
      const newParams = createPageURLParams(currentPage, searchParams);
      setSearchParams(newParams);
    }
  }, [currentPage, pageInUrl, searchParams, setSearchParams]);

  return (
    <>
      <JobsListSection
       isHomePage={false} 
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}
       />
    </>
  );
}