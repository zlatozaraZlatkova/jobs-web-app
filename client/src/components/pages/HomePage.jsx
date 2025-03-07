import SearchBar from "../searchBar/SearchBar";
import CategoriesJobSection from "../categoriesJobSection/CategoriesJobSection";
import JobsListSection from "../jobsListSection/JobsListSection";
import TrustedCompaniesSection from "../trustedCompaniesSection/TrustedCompaniesSection";

export default function HomePage() {
  return (
    <>
      <main>
        <section className="search-section">
          <h1>GET HIRED &amp; BUILD A STRONG TEAM</h1>
          <p>Advance your career and build a strong, successful team.</p>

          <SearchBar />
        </section>

        <CategoriesJobSection />
        <JobsListSection isHomePage={true} />
        <TrustedCompaniesSection />
      </main>
    </>
  );
}
