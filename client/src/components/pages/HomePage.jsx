import SearchBar from "../searchBar/SearchBar";
import CategoriesJobSection from "../categoriesJobSection/CategoriesJobSection";
import FeaturedJobSection from "../FeaturedJobSection/FeaturedJobSection";
import TrustedCompaniesSection from "../trustedCompaniesSection/TrustedCompaniesSection";

export default function HomePage() {
  return (
    <>
    
      <main>
        <SearchBar />
        <CategoriesJobSection />
        <FeaturedJobSection />
        <TrustedCompaniesSection />
      </main>
     
    </>
  );
}
