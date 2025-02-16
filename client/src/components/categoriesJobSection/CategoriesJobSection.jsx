import styles from "./CategoriesJobSection.module.css";

import CategoryCard from "./categoryCard/CategoryCard";

export default function CategoriesJobSection() {
  return (
    <>
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Explore By Category</h2>
          <div className={styles.infoGrid}>
            <CategoryCard />
            <CategoryCard />
          </div>
        </div>
      </section>
    </>
  );
}
