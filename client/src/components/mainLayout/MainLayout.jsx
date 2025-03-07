import Footer from "../footer/Footer";
import Navigation from "../navigation/Navigation";
import ScrollToTo from "../scrollToTop/ScrollToTop";

// eslint-disable-next-line react/prop-types
export default function MainLayout({ children }) {
  return (
    <>
      <ScrollToTo />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
