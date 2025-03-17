import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { useInitializeAuth } from "./apiHooks/useAuth";

import "./styles/index.css";

import HomePage from "./components/pages/HomePage";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import MainLayout from "./components/mainLayout/MainLayout";
import CreateProfilePage from "./components/pages/CreateProfilePage";
import CreateCompanyProfilePage from "./components/pages/CreateCompanyProfilePage";
import DetailsProfilePage from "./components/pages/DetailsProfilePage";
import EmployeesPage from "./components/pages/EmployeesPage";
import JobsPage from "./components/pages/JobsPage";
import JobDetailsPage from "./components/pages/JobDetailsPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import CreateJob from "./components/createJob/CreateJob";



function App() {
  const [authState, setAuthState] = useState({});

  const changeAuthState = (state) => {
    setAuthState(state)

  }
  
  useInitializeAuth(changeAuthState);

  const contextData = {
    email: authState.email,
    _id: authState._id,
    role: authState.role, 
    isAuthenticated: !!authState.email,
    changeAuthState

  }


  return (
    <AuthContext.Provider value={contextData}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/jobs/create" element={<CreateJob />} />
            <Route path="/profile/catalog" element={<EmployeesPage />} />
            <Route path="/profile" element={<DetailsProfilePage />} />
            <Route path="/profile/create" element={<CreateProfilePage />} />
            <Route path="/company/profile/create" element={<CreateCompanyProfilePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
