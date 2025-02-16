import CompanyLogo from "./companyLogo/CompanyLogo";

export default function TrustedCompaniesSection() {
  return (
    <>
      <section className="trusted-section">
        <div className="trusted-container">
          <h2 className="section-title">
            Trusted by your favored top techs companies
          </h2>
          <div className="trusted-logo-grid">
            <CompanyLogo />
            <CompanyLogo />
            <CompanyLogo />
            <CompanyLogo />
          </div>
        </div>
      </section>
    </>
  );
}
