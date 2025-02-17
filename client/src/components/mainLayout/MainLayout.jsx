import Footer from "../footer/Footer";
import Navigation from "../navigation/Navigation";

// eslint-disable-next-line react/prop-types
export default function MainLayout({ children }) {
    return (
      <>
        <Navigation/>
        <main>
          {children} 
        </main>
        <Footer/>
      </>
    );
  }