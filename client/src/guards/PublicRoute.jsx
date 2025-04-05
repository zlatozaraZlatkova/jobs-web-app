import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PublicRoute() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
  
    useEffect(() => {
      if (isAuthenticated) {
        return navigate("/");
      }
    }, [isAuthenticated, navigate]);
  
    return (
      <>
        <Outlet />
      </>
    );
  }