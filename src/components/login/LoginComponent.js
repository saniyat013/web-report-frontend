import React, { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { config as BASE } from "../../config/Config";
import * as END_POINT from "../../config/Endpoint";

import "./LoginComponent.css";

import { reloadPage } from "../../common/CommonFunctions";
import { Navigate } from "react-router-dom";

import LocalizedStrings from "react-localization";
import { Lang } from "../../i18n/Lang";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

let strings = new LocalizedStrings(Lang);

var userEmail;
var userPassword;

const LoginComponent = () => {
    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    const [loggedIn, setLoggedIn] = useState("");

    const loginUser = (e) => {
        e.preventDefault();

        if (userEmail === undefined || userPassword === undefined) {
            toast.error(strings.fill_all_fields);
        } else {
            let config = {
                method: "post",
                url: BASE.BASE_API_URL + END_POINT.LOGIN_USER,
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    email: userEmail,
                    password: userPassword,
                },
            };

            axios(config)
                .then((response) => {
                    setLoggedIn("loggedIn");
                    localStorage.setItem("userID", response.data.user.id);
                    localStorage.setItem("userEmail", response.data.user.email);
                    localStorage.setItem(
                        "userDivision",
                        response.data.user.division
                    );
                    localStorage.setItem(
                        "userDistrict",
                        response.data.user.district
                    );
                    localStorage.setItem("userUnit", response.data.user.unit);
                    localStorage.setItem("userToken", response.data.token);

                    console.log(localStorage.getItem("userID"));
                    console.log(localStorage.getItem("userEmail"));
                    console.log(localStorage.getItem("userDivision"));
                    console.log(localStorage.getItem("userDistrict"));
                    console.log(localStorage.getItem("userUnit"));
                    console.log(localStorage.getItem("userToken"));
                })
                .catch((err) => {
                    if (err.response.status === 401) {
                        toast.error(strings.invalid_credentials);
                    } else {
                        toast.error(strings.login_fail);
                    }
                });
        }
    };

    return (
        <Container className="app-login">
            {loggedIn === "loggedIn" && <Navigate to="/home" /> && reloadPage()}
            <div className="login-form">
                <h3 className="text-center">{strings.login}</h3>
                <Form onSubmit={loginUser}>
                    <Form.Group className="mb-3">
                        <Form.Label>{strings.email}</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder={strings.enter_email}
                            onChange={(e) => {
                                userEmail = e.target.value;
                            }}
                        />

                        <Form.Label>{strings.password}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={strings.password}
                            id="password"
                            onChange={(e) => {
                                userPassword = e.target.value;
                            }}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="submit-button"
                    >
                        {strings.login}
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default LoginComponent;
