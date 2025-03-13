import JobsListSection from "../jobsListSection/JobsListSection";
import { useState } from "react";

export default function JobsPage() {
    const [currentPage, setCurrentPage] = useState(1);

    return(<>
   <JobsListSection 
      isHomePage={false}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
    </>)
}