import React from "react";
import AuthForm from "../components/AuthForm";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/RegistrationForm";
import ForgetPassword from "../components/forgetPassword";
import UserDashboard from "../components/user/UserDashboard";
import AdminDashboard from "../components/admin/AdminDashboard";
import MedecinDashboard from "../components/medecin/MedecinDashboard";

const AppRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/signin" element={<AuthForm/>} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/forget-password" element={<ForgetPassword/>}/>
            <Route path="/user-dashboard" element={<UserDashboard/>}/>
            <Route path="/admin_dashboard" element={<AdminDashboard/>}/>
            <Route path="/medecin-dashboard" element={<MedecinDashboard/>}/>
        </Routes>
    );
};

export default AppRoute;
