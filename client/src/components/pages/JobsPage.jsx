import JobsListSection from "../jobsListSection/JobsListSection";
import { usePaginationWithURL } from "../../apiHooks/usePaginationWithURL";


export default function JobsPage() {
  const { urlPageNumber, setUrlPageNumber } = usePaginationWithURL();

  return (
    <>
      <JobsListSection
       isHomePage={false} 
       urlPageNumber={urlPageNumber}
       setUrlPageNumber={setUrlPageNumber}
       />
    </>
  );
}