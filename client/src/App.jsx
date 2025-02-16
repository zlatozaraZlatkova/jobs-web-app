import "./styles/index.css";

import Navigation from "./components/navigation/Navigation";
import SearchBar from "./components/searchBar/SearchBar";
import CategoriesJobSection from "./components/categoriesJobSection/CategoriesJobSection";
import FeaturedJobSection from "./components/FeaturedJobSection/FeaturedJobSection";
import TrustedCompaniesSection from "./components/trustedCompaniesSection/TrustedCompaniesSection";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Navigation />
      <SearchBar />
      <CategoriesJobSection />
      <FeaturedJobSection />
      <TrustedCompaniesSection />
      <Footer />
    </>
  );
}

export default App;
