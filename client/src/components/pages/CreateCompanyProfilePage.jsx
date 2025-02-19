import CreateCompanyProfile from "../employer/CreateCompanyProfile";

export default function CreateCompanyProfilePage() {
  return (
    <>
      <div className="container">
        <div className="form-card">
          <h1 className="form-title">Create Company Profile</h1>
          <p className="form-subtitle">
            Provide your company information to get started
          </p>
          {/* Success Message */}
          <div className="success-message">
            Company profile created successfully!
          </div>
          <CreateCompanyProfile/>
        </div>
      </div>
    </>
  );
}
