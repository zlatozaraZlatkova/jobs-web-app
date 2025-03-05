import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./styles/index.css";

import HomePage from "./components/pages/HomePage";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import MainLayout from "./components/mainLayout/MainLayout";
import CreateProfilePage from "./components/pages/CreateProfilePage";
import CreateCompanyProfilePage from "./components/pages/CreateCompanyProfilePage";
import DetailsProfilePage from "./components/pages/DetailsProfilePage";
import EmployeesPage from "./components/pages/EmployeesPage";



function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/profile/catalog" element={<EmployeesPage/>} />
          <Route path="/profile" element={<DetailsProfilePage/>} />
          <Route path="/profile/create" element={<CreateProfilePage />} />
          <Route path="/company/profile/create" element={<CreateCompanyProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
