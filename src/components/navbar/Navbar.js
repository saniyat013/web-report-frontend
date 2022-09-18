import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import axios from "axios";
import { config as BASE } from "../../config/Config";
import * as END_POINT from "../../config/Endpoint";

import "./Navbar.css";

import bdflag from "../../assets/images/bd.svg";
import usflag from "../../assets/images/us.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LocalizedStrings from "react-localization";
import { Lang } from "../../i18n/Lang";
import { reloadPage } from "../../common/CommonFunctions";
let strings = new LocalizedStrings(Lang);

toast.configure();

const AppNavbar = () => {
    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    const [applicationLanguage, setApplicationLanguage] = useState("");
    const [displayLogin, setDisplayLogin] = useState();
    const [displayLogout, setDisplayLogout] = useState();
    const [displayRegister, setDisplayRegister] = useState();

    useEffect(() => {
        if (
            localStorage.getItem("appLanguage") === null ||
            localStorage.getItem("appLanguage") === "en"
        ) {
            setApplicationLanguage("বাংলা");
        } else {
            setApplicationLanguage("English");
        }

        if (localStorage.getItem("userEmail") !== null) {
            setDisplayLogout(true);
            setDisplayRegister(false);
        } else {
            if (window.location.pathname === "/register") {
                setDisplayLogin(true);
                setDisplayRegister(false);
            } else {
                setDisplayLogin(false);
                setDisplayRegister(true);
            }
        }
    }, []);

    const changeLang = () => {
        if (localStorage.getItem("appLanguage") === "en") {
            localStorage.setItem("appLanguage", "bn");
            setApplicationLanguage("English");
        } else if (localStorage.getItem("appLanguage") === "bn") {
            localStorage.setItem("appLanguage", "en");
            setApplicationLanguage("বাংলা");
        }
        reloadPage();
    };

    const logout = () => {
        // console.log(localStorage.getItem("userID"));
        // console.log(localStorage.getItem("userRole"));
        // console.log(localStorage.getItem("userName"));
        // console.log(localStorage.getItem("userEmail"));
        // console.log(localStorage.getItem("userDivision"));
        // console.log(localStorage.getItem("userDistrict"));
        // console.log(localStorage.getItem("userUnit"));
        // console.log(localStorage.getItem("userToken"));
        // console.log(localStorage.getItem("userDivisionName"));
        // console.log(localStorage.getItem("userDistrictName"));
        // console.log(localStorage.getItem("userUnitName"));
        let config = {
            method: "post",
            url: BASE.BASE_API_URL + END_POINT.LOGOUT_USER,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        };

        axios(config)
            .then((response) => {
                localStorage.removeItem("userID");
                localStorage.removeItem("userRole");
                localStorage.removeItem("userName");
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userDivision");
                localStorage.removeItem("userDistrict");
                localStorage.removeItem("userUnit");
                localStorage.removeItem("userToken");
                localStorage.removeItem("userDivisionName");
                localStorage.removeItem("userDistrictName");
                localStorage.removeItem("userUnitName");

                reloadPage();
            })
            .catch((err) => {
                toast.error(strings.logout_fail);
            });
    };

    return (
        <Navbar collapseOnSelect expand="lg" variant="light" sticky="top">
            <Container>
                <Navbar.Brand href="/home">{strings.title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {displayLogout ? (
                            <React.Fragment>
                                <Nav.Link href="/home">{strings.home}</Nav.Link>
                                <Nav.Link href="/report">
                                    {strings.report_nav}
                                </Nav.Link>
                                <Nav.Link href="/add-report">
                                    {strings.add_report}
                                </Nav.Link>
                                <Nav.Link href="/update-member">
                                    {strings.update_members}
                                </Nav.Link>
                            </React.Fragment>
                        ) : null}
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={changeLang}>
                            <img
                                src={
                                    localStorage.getItem("appLanguage") ===
                                        "en" ||
                                    localStorage.getItem("appLanguage") === null
                                        ? bdflag
                                        : usflag
                                }
                                alt={
                                    localStorage.getItem("appLanguage") === "en"
                                        ? "BD Flag"
                                        : "EN Flag"
                                }
                                className="lang-flag"
                            />
                            {applicationLanguage}
                        </Nav.Link>

                        <NavDropdown
                            title={localStorage.getItem("userName")}
                            id="collasible-nav-dropdown"
                            style={{
                                display: displayLogout ? "block" : "none",
                            }}
                        >
                            {localStorage.getItem("userRole") === "1" ? (
                                <NavDropdown.Item
                                    className="nav-dropdown-item"
                                    href="/dashboard"
                                >
                                    {strings.dashboard}
                                </NavDropdown.Item>
                            ) : null}
                            <NavDropdown.Item
                                className="nav-dropdown-item"
                                onClick={logout}
                            >
                                {strings.logout}
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link
                            href="/login"
                            style={{
                                display: displayLogin ? "block" : "none",
                            }}
                        >
                            {strings.login}
                        </Nav.Link>

                        <Nav.Link
                            href="/register"
                            style={{
                                display: displayRegister ? "block" : "none",
                            }}
                        >
                            {strings.register}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default AppNavbar;
