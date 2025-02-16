import CategoryCard from "./categoryCard/CategoryCard";

export default function CategoriesJobSection() {
    return(
        <>
             <section className="info-section">
            <div className="container">
              <h2 className="section-title">Explore By Category</h2>
              <div className="info-grid">
                {/* first job container  */}
                <CategoryCard />
                {/* second job container */}
               <CategoryCard/>
              </div>
            </div>
          </section>
        </>
    )
}