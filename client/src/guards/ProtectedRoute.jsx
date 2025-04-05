/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <Outlet/>
        </>
    );
}
