import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h1 className="not-found-title">404 Not Found</h1>
        <p className="not-found-text">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to={"/"} className="btn btn-primary">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
