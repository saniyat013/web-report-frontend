import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import LocalizedStrings from "react-localization";
import { Lang } from "../src/i18n/Lang";
let strings = new LocalizedStrings(Lang);

function App() {
    // localStorage.setItem("appLanguage", "en");
    // strings.setLanguage(localStorage.getItem("appLanguage"))
    return (
        <div className="App">
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
