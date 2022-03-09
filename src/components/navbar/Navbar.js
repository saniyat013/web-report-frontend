import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

import "./Navbar.css";

import bdflag from "../../assets/images/bd.svg";
import usflag from "../../assets/images/us.svg";

import LocalizedStrings from "react-localization";
import { Lang } from "../../i18n/Lang";
import { reloadPage } from "../../common/CommonFunctions";
let strings = new LocalizedStrings(Lang);

const AppNavbar = () => {
    const [applicationLanguage, setApplicationLanguage] = useState("");

    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    useEffect(() => {
        if (
            localStorage.getItem("appLanguage") === null ||
            localStorage.getItem("appLanguage") === "en"
        ) {
            setApplicationLanguage("বাংলা");
        } else {
            setApplicationLanguage("English");
        }
    });

    const changeLang = () => {
        console.log(localStorage.getItem("appLanguage"));
        if (localStorage.getItem("appLanguage") === "en") {
            localStorage.setItem("appLanguage", "bn");
            setApplicationLanguage("English");
        } else if (localStorage.getItem("appLanguage") === "bn") {
            localStorage.setItem("appLanguage", "en");
            setApplicationLanguage("বাংলা");
        }
        reloadPage();
    };

    return (
        <Navbar collapseOnSelect expand="lg" variant="light" sticky="top">
            <Container>
                <Navbar.Brand href="/">{strings.title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#features">Features</Nav.Link> */}
                        {/* <NavDropdown
                            title="Dropdown"
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>                      
                        </NavDropdown> */}
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={changeLang}>
                            <img
                                src={
                                    localStorage.getItem("appLanguage") === "en"
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
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default AppNavbar;
