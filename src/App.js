import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Report from "./screens/Report";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./screens/Login";
import AddReport from "./screens/AddReport";
import UpdateMember from "./screens/UpdateMember";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import PublicRouting from "./routing/PublicRouting";
import PrivateRouting from "./routing/PrivateRouting";

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
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="report" element={<Report />} />
                        <Route path="add-report" element={<AddReport />} />
                        <Route
                            path="update-member"
                            element={<UpdateMember />}
                        />
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
