import JobsListSection from "../jobsListSection/JobsListSection";
import { usePaginationWithURL } from "../../apiHooks/usePaginationWithURL";


export default function JobsPage() {
  const { currentPage, setCurrentPage } = usePaginationWithURL();

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