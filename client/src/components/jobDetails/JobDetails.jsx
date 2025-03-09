/* eslint-disable react/prop-types */
import styles from "./JobDetails.module.css";

export default function JobDetails({ currentJob, onEditClick, onDeleteClick }) {
  return (
    <>
      <div className={styles.jobDetailsPage}>
        <section className={styles.contentSection}>
          <div className={styles.container}>
            <div className={styles.contentGrid}>

              <main className={styles.mainColumn}>
                {/* Job Header Card */}
                <div className={styles.card}>
                  <span className={styles.jobBadge}>{currentJob.type}</span>
                  <h1 className={styles.jobTitle}>{currentJob.title}</h1>
                  <div className={styles.jobMeta}>
                    <div className={styles.jobMetaItem}>
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{currentJob.location}</span>
                    </div>
                    <div className={styles.jobMetaItem}>
                      <i className="far fa-money-bill-alt"></i>
                      <span>${currentJob.salary}</span>
                    </div>
                  </div>
                </div>

                {/* Job Description Card */}
                <div className={styles.card}>
                  <h2 className={styles.sectionTitle}>Job Description</h2>
                  <div className={styles.contentBlock}>
                    <p>{currentJob.description}</p>
                  </div>
                </div>
              </main>

              <aside className={styles.sidebarColumn}>
                {/* Company Info Card */}
                <div className={styles.card}>
                  <h2 className={styles.sectionTitle}>Company Info</h2>
                  <h3 className={styles.companyName}>
                    {currentJob.company?.name}
                  </h3>
                  <p className={styles.companyDescription}>
                    {currentJob.company?.description}
                  </p>

                  <div className={styles.divider}></div>

                  <div className={styles.contactList}>
                    <div className={styles.contactItem}>
                      <h4 className={styles.contactLabel}>
                        <i className="fas fa-envelope"></i> Contact Email
                      </h4>
                      <p className={styles.contactValue}>
                        {currentJob.company?.contactEmail}
                      </p>
                    </div>

                    <div className={styles.contactItem}>
                      <h4 className={styles.contactLabel}>
                        <i className="fas fa-phone"></i> Contact Phone
                      </h4>
                      <p className={styles.contactValue}>
                        {currentJob.company?.contactPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Manage Job Card */}
                <div className={styles.card}>
                  <h2 className={styles.sectionTitle}>Manage Job</h2>
                  <div className={styles.buttonGroup}>
                    <button
                      className="btn btn-primary"
                      onClick={() => onEditClick(currentJob._id)}
                    >
                      <i className="fas fa-edit"></i> Edit Job
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => onDeleteClick(currentJob._id)}
                    >
                      <i className="fas fa-trash-alt"></i> Delete Job
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
