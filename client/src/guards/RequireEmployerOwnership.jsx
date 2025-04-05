/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useGetAdminProfile } from "../apiHooks/useEmployer";

export default function RequireEmployerOwnership() {
  const navigate = useNavigate();
  const { id: jobId } = useParams();
  const { _id, isAuthenticated, role, isLoading } = useContext(AuthContext);
  const { profileData, isLoading: profileLoading } = useGetAdminProfile();
  const [isOwner, setIsOwner] = useState(false);
  
  useEffect(() => {

    if (isLoading || profileLoading) {
      return;
    }
    
    if (!isAuthenticated) {
      setIsOwner(false);
      navigate("/login");
      return;
    }
    
    if (role !== "employer") {
      setIsOwner(false);
      navigate("/unauthorized");
      return;
    }
    

    if (jobId) {

      const hasPostedJobs = profileData && 
                          profileData.postedJobs && 
                          Array.isArray(profileData.postedJobs);
   
      const isJobOwner = hasPostedJobs && 
                          profileData.postedJobs.some(job => job._id === jobId);
      
      if (!isJobOwner) {
        setIsOwner(false);
        navigate("/unauthorized");
        return;
      }

    } else {

      const isProfileOwner = profileData && 
                             profileData.ownerId && 
                             profileData.ownerId._id === _id;
      
      if (!isProfileOwner) {
        setIsOwner(false);
        navigate("/unauthorized");
        return;
      }
    }
    
 
    setIsOwner(true);
  }, [
    _id,
    isAuthenticated,
    role,
    isLoading,
    profileLoading,
    navigate,
    profileData,
    jobId
  ]);
  
  if (isLoading || profileLoading) {
    return <div>Verifying permissions...</div>;
  }
  
  if (!isOwner) {
    return null;
  }
  
  return <Outlet />;
}