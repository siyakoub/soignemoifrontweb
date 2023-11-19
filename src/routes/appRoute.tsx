import React from "react";
import AuthForm from "../components/AuthForm";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/RegistrationForm";
import ForgetPassword from "../components/forgetPassword";

const AppRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/signin" element={<AuthForm/>} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/forget-password" element={<ForgetPassword/>}/>
        </Routes>
    );
};

export default AppRoute;
