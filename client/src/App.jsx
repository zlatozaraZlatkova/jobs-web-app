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

import ProtectedRoute from "./guards/ProtectedRoute";
import RequireEmployerOwnership from "./guards/RequireEmployerOwnership";
import RequireEmployerRole from "./guards/RequireEmployerRole";
import RequireEmployeeRole from "./guards/RequireEmployeeRole";
import RequireCompanyOwnership from "./guards/RequireCompanyOwnership";
import PublicRoute from "./guards/PublicRoute";
import ThemeContextProvider from "./contexts/ThemeContextProvider";

function App() {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <MainLayout>
              <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/jobs/:id" element={<JobDetailsPage />} />
                <Route path="/profile/catalog" element={<EmployeesPage />} />

                <Route element={<RequireEmployerRole />}>
                  <Route path="/company/profile" element={<DashboardEmployer />} />
                  <Route path="/jobs/create" element={<CreateJob />} />
                </Route>
                <Route element={<RequireEmployerOwnership />}>
                  <Route path="/jobs/update/:id" element={<EditJob />} />
                </Route>

                <Route element={<RequireCompanyOwnership />}>
                  <Route path="/company/profile/update/:id" element={<EditCompanyProfile />} />
                </Route>

                <Route element={<RequireEmployeeRole />}>
                  <Route path="/profile" element={<DashboardEmployee />} />
                  <Route path="/profile/create" element={<CreateProfilePage />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile/catalog/:id" element={<CVPage />} />
                </Route>

                <Route element={<PublicRoute />}>
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </SearchContextProvider>
      </AuthContextProvider>

    </ThemeContextProvider>
  );
}

export default App;
