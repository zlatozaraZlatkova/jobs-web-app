import { useRef, useEffect, useState } from "react";
import { useGetPaginatedEmployeeProfile } from "../../apiHooks/useEmployee";
import { usePaginationWithURL } from "../../apiHooks/usePaginationWithURL";
import BasicProfileCard from "../employee/detailsProfile/BasicProfileCard";
import Pagination from "../pagination/Pagination";

export default function EmployeesPage() {
  const sectionRef = useRef(null);
  const [displayError, setDisplayError] = useState(null);

  const { urlPageNumber, setUrlPageNumber } = usePaginationWithURL();

  const { employees, isLoading, totalPages, error } = useGetPaginatedEmployeeProfile(urlPageNumber);


  useEffect(() => {
    if (error) {
      setDisplayError(error);
    }
  }, [error]);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [urlPageNumber]);

  const nextPage = () => {
    if (urlPageNumber < totalPages) {
      setUrlPageNumber(urlPageNumber + 1);
    }
  };

  const prevPage = () => {
    if (urlPageNumber > 1) {
      setUrlPageNumber(urlPageNumber - 1);
    }
  };


  return (
    <>
      <section className="experts-section" ref={sectionRef}>
        <div className="container-catalog">
          <div className="section-header">
            {displayError && (
              <div className="error-message">{displayError}</div>
            )}
            <h2 className="section-title">Looking for experts?</h2>
            <p className="section-description">
             Our mission is to make finding the right expert fast, simple, and reliable — whether you’re looking for a specialist for a single project or a trusted partner for the long term.
            </p>
          </div>

          {isLoading ? (
            <div>Loading employees...</div>
          ) : (
            <div>
              {employees && employees.length > 0 ? (
                <div className="employees-grid">
                  {employees.map((employee) => (
                    <BasicProfileCard isEmployeesPage={true}
                     key={employee._id} employee={employee} />
                  ))}
                </div>
              ) : (
                <div>No employees found.</div>
              )}
            </div>
          )}

          <Pagination
             currentPage={urlPageNumber}
             totalPages={totalPages}
             onPrevPage={prevPage}
             onNextPage={nextPage}
          />
        </div>
      </section>
    </>
  );
}
