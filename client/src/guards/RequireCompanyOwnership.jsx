/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useGetAdminProfile } from "../apiHooks/useEmployer";

export default function RequireCompanyOwnership() {
  const navigate = useNavigate();
  const { id: companyIdFromUrl } = useParams();
  const { _id, isAuthenticated, role, isLoading } = useContext(AuthContext);
  const { profileData, isLoading: profileLoading } = useGetAdminProfile();

  useEffect(() => {
    if (isLoading || profileLoading) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (role !== "employer") {
      navigate("/unauthorized");
      return;
    }

    const isProfileOwner = profileData?.ownerId?._id === _id || profileData?.ownerId === _id;
    
    if (!isProfileOwner) {
      navigate("/unauthorized");
      return;
    }

    const userCompanyId = profileData?.companyId?._id || profileData?.companyId;

    if (!userCompanyId) {
      navigate("/unauthorized");
      return;
    }

    if (companyIdFromUrl !== userCompanyId) {
      navigate(`/unauthorized`);
      return;
    }

    
  }, [
    _id,
    isAuthenticated,
    role,
    isLoading,
    profileLoading,
    navigate,
    profileData,
    companyIdFromUrl,
  ]);

  if (isLoading || profileLoading) {
    return <div>Verifying permissions...</div>;
  }

  return <Outlet />;
}
