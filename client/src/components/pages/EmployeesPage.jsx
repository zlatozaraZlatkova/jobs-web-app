import { useRef } from "react";
import BasicProfileCard from "../employee/detailsProfile/BasicProfileCard";
import Pagination from "../pagination/Pagination";
import { useGetPafinatedEmployeeProfile } from "../../apiHooks/useEmployee";


export default function EmployeesPage() {
    const sectionRef = useRef(null);
    
    const { employees, isLoading, currentPage, setCurrentPage,totalPages} = useGetPafinatedEmployeeProfile();

    const nextPage = () => {
        if (currentPage < totalPages) {
            if (sectionRef.current) {
                sectionRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
            }

            setCurrentPage((currentPage) => currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            if (sectionRef.current) {
                sectionRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
            setCurrentPage((currentPage) => currentPage - 1);
        }
    };

    return (
        <>
            <section className="experts-section" ref={sectionRef}>
                <div className="container-catalog">
                    <div className="section-header">
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
                                        <BasicProfileCard key={employee._id} employee={employee} />
                                    ))}
                                </div>
                            ) : (
                                <div>No employees found.</div>
                            )}
                        </div>
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrevPage={prevPage}
                        onNextPage={nextPage}
                    />
                </div>
            </section>
        </>
    );
}
