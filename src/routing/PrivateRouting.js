import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouting = () => {
    return localStorage.getItem("userEmail") !== null ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRouting;
