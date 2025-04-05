/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RequireEmployerRole() {
  const navigate = useNavigate();
  const { isAuthenticated, role, isLoading } = useContext(AuthContext);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (role !== "employer") {
      navigate("/unauthorized");
    }
  }, [isAuthenticated, role, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}
