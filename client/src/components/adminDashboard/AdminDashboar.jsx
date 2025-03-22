/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

import { AuthContext } from "../../contexts/AuthContext";
import { useGetAdminProfile } from "../../apiHooks/useEmployer.js";
import { useDeleteJob } from "../../apiHooks/useJobs";
import { capitalizeName } from "../../utils/stringUtils.js";

import CreateCompanyProfile from "../employer/CreateCompanyProfile.jsx";

export default function AdminDashboard() {
  const { _id } = useContext(AuthContext);
  const navigate = useNavigate();

  const { profileData, refreshData } = useGetAdminProfile();
  const { submitDelJob } = useDeleteJob();

  const [activeTab, setActiveTab] = useState("overview");
  const [serverError, setServerError] = useState(null);

  const isProfileOwner = profileData?.ownerId?._id === _id;
  console.log("_id from AuthContext:", _id);
  console.log("isProfile owner:", isProfileOwner);
  console.log("profile data", profileData);

  
  const hasCompleteProfile =
    profileData && profileData.ownerId && profileData.companyId;

  const onEditClickHander = (id) => {
    navigate(`/jobs/update/${id}`);
  };

  const onDeleteClickHandler = async (id) => {
    try {
      console.log("onDelete:", id);
      await submitDelJob(id);
      refreshData();
    } catch (error) {
      console.log("delete", error);
    }
  };

  const onCompanyEditClickHander = (id) => {
    console.log("onClick hander Company ID:", id);
    navigate(`/company/profile/update/${id}`);
  };

  return (
    <section className={styles.dashboardSection}>
    {serverError && <div className="error-message">{serverError}</div>}
      {hasCompleteProfile ? (
        <div className={styles.adminDashboard}>
          <header className={styles.dashboardHeader}>
            <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
            <div className={styles.tabNav}>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "overview" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "jobs" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("jobs")}
              >
                Posted Jobs
              </button>
              <button
                className={`${styles.tabButton} ${
                  activeTab === "applications" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("applications")}
              >
                Applications
              </button>
            </div>
          </header>
          <div className={styles.dashboardContent}>
            {activeTab === "overview" && (
              <div className={styles.overviewSection}>
                {/* Owner Info Section */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Owner Information</h2>
                  <div className={styles.ownerInfo}>
                    <div className={styles.avatarContainer}>
                      <img
                        src={profileData.ownerId.avatar}
                        alt={profileData.ownerId.name}
                        className={styles.avatar}
                      />
                    </div>
                    <div className={styles.ownerDetails}>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Name:</span>
                        <span className={styles.infoValue}>
                          {capitalizeName(profileData.ownerId.name)}
                        </span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Email:</span>
                        <span className={styles.infoValue}>
                          {profileData.ownerId.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Info Section */}
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Company Information</h2>
                  <div className={styles.companyInfo}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Name:</span>
                      <span className={styles.infoValue}>
                        {profileData.companyId.companyName}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Email:</span>
                      <span className={styles.infoValue}>
                        {profileData.companyId.contactEmail}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Phone:</span>
                      <span className={styles.infoValue}>
                        {profileData.companyId.contactPhone}
                      </span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Description:</span>
                      <p className={styles.companyDescription}>
                        {profileData.companyId.description}
                      </p>
                    </div>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() =>
                          onCompanyEditClickHander(profileData.companyId._id)
                        }
                        className={styles.buttonSecondary}
                      >
                        Edit Company
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dashboard Summary */}
                <div className={styles.summaryGrid}>
                  <div className={styles.summaryCard}>
                    <div className={styles.summaryIconContainer}>
                      <i className="fas fa-briefcase"></i>
                    </div>
                    <div className={styles.summaryContent}>
                      <h3 className={styles.summaryTitle}>Posted Jobs</h3>
                      <p className={styles.summaryValue}>
                        {profileData.postedJobs.length}
                      </p>
                    </div>
                  </div>

                  <div className={styles.summaryCard}>
                    <div className={styles.summaryIconContainer}>
                      <i className="fas fa-users"></i>
                    </div>
                    <div className={styles.summaryContent}>
                      <h3 className={styles.summaryTitle}>Applications</h3>
                      <p className={styles.summaryValue}>
                        {profileData.receivedApplications.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "jobs" && (
              <div className={styles.jobsSection}>
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Posted Jobs</h2>
                    <Link to="/jobs/create" className="btn btn-primary">
                      <i className="fas fa-plus"></i> Post New Job
                    </Link>
                  </div>

                  {profileData.postedJobs.length > 0 ? (
                    <div className={styles.tableContainer}>
                      <table className={styles.dataTable}>
                        <thead>
                          <tr>
                            <th>Position</th>
                            <th>Tech Stack</th>
                            <th>Location</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {profileData.postedJobs.map((job) => (
                            <tr key={job._id}>
                              <td>{job.title}</td>
                              <td>{job.techStack}</td>
                              <td>{job.location}</td>
                              <td>
                                <div className={styles.tableActions}>
                                  <Link
                                    to={`/jobs/${job._id}`}
                                    className={styles.actionButton}
                                  >
                                    <i className="fas fa-eye"></i>
                                  </Link>
                                  <button
                                    onClick={() => onEditClickHander(job._id)}
                                    className={styles.actionButton}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    onClick={() =>
                                      onDeleteClickHandler(job._id)
                                    }
                                    className={`${styles.actionButton} ${styles.deleteButton}`}
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <p>No jobs have been posted yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "applications" && (
              <div className={styles.applicationsSection}>
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Received Applications</h2>

                  {profileData.receivedApplications.length > 0 ? (
                    <div className={styles.tableContainer}>
                      <table className={styles.dataTable}>
                        <thead>
                          <tr>
                            <th>Position</th>
                            <th>Applicant Name</th>
                            <th>Location</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {profileData.receivedApplications.map(
                            (application) => (
                              <tr key={application.id}>
                                <td>{application.position}</td>
                                <td>{application.applicantName}</td>
                                <td>{application.location}</td>
                                <td>
                                  <div className={styles.tableActions}>
                                    <Link
                                      to={`/applications/${application.id}`}
                                      className={styles.actionButton}
                                    >
                                      <i className="fas fa-eye"></i>
                                    </Link>
                                    <button
                                      className={`${styles.actionButton} ${styles.approveButton}`}
                                    >
                                      <i className="fas fa-check"></i>
                                    </button>
                                    <button
                                      className={`${styles.actionButton} ${styles.declineButton}`}
                                    >
                                      <i className="fas fa-times"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <p>No applications have been received yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.adminDashboard}>
            <div className={styles.dashboardContent}>
              <div className={`${styles.card} ${styles.createCompany}`}>

                <div className={styles.emptyState}>
                  <header className={styles.dashboardHeader}>
                    <h1 className={styles.dashboardTitle}>
                      Start by creating your company profile
                    </h1>
                  </header>
                  <div className={styles.companyInfo}>
                    <CreateCompanyProfile />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div> 
      )}
    </section>
  );
}
