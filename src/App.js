import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./screens/Login";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import PublicRouting from "./routing/PublicRouting";
import PrivateRouting from "./routing/PrivateRouting";

import LocalizedStrings from "react-localization";
import { Lang } from "../src/i18n/Lang";
let strings = new LocalizedStrings(Lang);

function App() {
    if (localStorage.getItem("appLanguage") === null) {
        localStorage.setItem("appLanguage", "en");
    }

    return (
        <div className="App">
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<PrivateRouting />}>
                        <Route path="home" element={<Home />} />
                    </Route>
                    <Route
                        path="/login"
                        element={
                            <PublicRouting>
                                <Login />
                            </PublicRouting>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRouting>
                                <Register />
                            </PublicRouting>
                        }
                    />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
