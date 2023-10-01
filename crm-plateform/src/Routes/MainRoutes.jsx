import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../Views/Pages/NotFound/NotFound.jsx";
import Home from "../Views/Pages/Home/Home.jsx";
import Login from "../Views/Pages/LoginPage/Login.jsx";
import Admin from "../Views/Pages/Admin/Admin.jsx";
import SalesForm from "../Views/Pages/SalesForm/SalesForm.jsx";
const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/salesform" element={<SalesForm />} />

                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default MainRoutes;
