import React from "react";
import { Navigate } from "react-router-dom";

const PublicRouting = ({ children }) => {
    return localStorage.getItem("userEmail") !== null ? (
        <Navigate to="/home" />
    ) : (
        children
    );
};

export default PublicRouting;
