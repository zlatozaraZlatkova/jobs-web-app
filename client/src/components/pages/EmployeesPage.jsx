import { useState, useEffect } from "react";
import BasicProfileCard from "../employee/detailsProfile/BasicProfileCard";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/profile/catalog");

        if (!response.ok) {
          throw new Error(`Failed to fetch employees: ${response.status}`);
        }

        const result = await response.json();

        //the response structure is { success, data: { items: [] } }
        if (result.data && Array.isArray(result.data.items)) {
          setEmployees(result.data.items);

        } else {
          setEmployees([]);
        }
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <section className="experts-section">
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
          <div className="view-all-btn">
            <a href="#" className="btn btn-primary">
              View All
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
