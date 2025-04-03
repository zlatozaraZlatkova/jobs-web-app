import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContextProvider";
import { SearchContextProvider } from "./contexts/SearchContextProvider";

import "./styles/index.css";

import HomePage from "./components/pages/HomePage";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import MainLayout from "./components/mainLayout/MainLayout";
import CreateProfilePage from "./components/pages/CreateProfilePage";
import EmployeesPage from "./components/pages/EmployeesPage";
import JobsPage from "./components/pages/JobsPage";
import JobDetailsPage from "./components/pages/JobDetailsPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import CreateJob from "./components/createJob/CreateJob";
import EditJob from "./components/editJob/EditJob";
import EditCompanyProfile from "./components/employer/EditCompanyProfile";
import CVPage from "./components/pages/CVPage";
import DashboardEmployee from "./components/dashboardEmployee/DashboardEmployee";
import DashboardEmployer from "./components/dashboardEmployer/DashboardEmployer";



function App() {
  
  return (
    <AuthContextProvider>
     <SearchContextProvider >

      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/jobs/create" element={<CreateJob />} />
            <Route path="/jobs/update/:id" element={<EditJob />} />

        
            <Route path="/profile" element={<DashboardEmployee />} />
            <Route path="/profile/create" element={<CreateProfilePage />} />
            <Route path="/profile/catalog" element={<EmployeesPage />} />
            <Route path="/profile/catalog/:id" element={<CVPage />} />

            <Route path="/company/profile" element={<DashboardEmployer/>}/>
            <Route path="/company/profile/update/:id" element={<EditCompanyProfile />} />
            
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>

      </SearchContextProvider>
    </AuthContextProvider>
  );
}

export default App;
