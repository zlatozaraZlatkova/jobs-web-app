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
              Lorem ipsum dolor sit amet, non odio tincidunt ut ante, lorem a
              euismod suspendisse vel, sed quam nulla mauris iaculis. Erat eget
              vitae malesuada, tortor tincidunt porta lorem lectus.
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
