import React, { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { config as BASE } from "../../config/Config";
import * as END_POINT from "../../config/Endpoint";
import { APP_CONSTANTS } from "../../config/Constants";

import "./RegisterComponent.css";

import { reloadPage } from "../../common/CommonFunctions";

import LocalizedStrings from "react-localization";
import { Lang } from "../../i18n/Lang";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

let strings = new LocalizedStrings(Lang);

var userName;
var userEmail;
var userMobile;
var userDivision;
var userDistrict;
var userUnit;
var userPassword;
var userPasswordConfirm;
var uniqueUser;

const RegisterComponent = () => {
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [passMatchTextVisible, setPassMatchTextVisible] = useState(false);

    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [units, setUnits] = useState([]);

    const [enableDistrict, setEnableDistrict] = useState(true);
    const [enableUnit, setEnableUnit] = useState(true);

    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    useEffect(() => {
        getAllDivision();
    }, []);

    const registerUser = async (e) => {
        e.preventDefault();

        if (
            userName === undefined ||
            userEmail === undefined ||
            userMobile === undefined ||
            userDivision === undefined ||
            userDistrict === undefined ||
            userUnit === undefined ||
            userPassword === undefined ||
            userPasswordConfirm === undefined
        ) {
            toast.error(strings.fill_all_fields);
            console.log();
        } else {
            await verifyUniqueEmail();

            if (uniqueUser === true) {
                if (verifyMobileNo() === false) {
                    toast.error(strings.invalid_mobile);
                } else {
                    if (passwordMatch === false) {
                        toast.error(strings.password_not_match);
                    } else {
                        let config = {
                            method: "post",
                            url: BASE.BASE_API_URL + END_POINT.REGISTER_USER,
                            headers: {
                                "Content-Type": "application/json",
                            },
                            data: {
                                name: userName,
                                division: userDivision,
                                district: userDistrict,
                                unit: userUnit,
                                email: userEmail,
                                mobile: userMobile,
                                password: userPassword,
                                password_confirmation: userPasswordConfirm,
                            },
                        };

                        axios(config)
                            .then((response) => {
                                toast.success(strings.registration_success);
                                setTimeout(() => {
                                    reloadPage();
                                }, 3000);
                            })
                            .catch((err) => {
                                toast.error(strings.registration_fail);
                            });
                    }
                }
            } else {
                toast.error(strings.already_registered);
            }
        }
    };

    const getAllDivision = () => {
        let config = {
            method: "get",
            url: BASE.BASE_API_URL + END_POINT.GET_ALL_DIVISION,
            headers: { "Content-Type": "application/json" },
        };

        axios(config)
            .then((response) => {
                setDivisions(response.data);
            })
            .catch((err) => {
                toast.error(strings.divisions_loading_failed);
            });
    };

    const getDistrictsByDivision = (id) => {
        let config = {
            method: "get",
            url: BASE.BASE_API_URL + END_POINT.GET_DISTRICTS_BY_DIVISION + id,
            headers: { "Content-Type": "application/json" },
        };

        axios(config)
            .then((response) => {
                setDistricts(response.data);
                setEnableDistrict(false);
            })
            .catch((err) => {
                toast.error(strings.districts_loading_failed);
            });
    };

    const getUnitsByDistrict = (id) => {
        let config = {
            method: "get",
            url: BASE.BASE_API_URL + END_POINT.GET_UNITS_BY_DISTRICT + id,
            headers: { "Content-Type": "application/json" },
        };

        axios(config)
            .then((response) => {
                setUnits(response.data);
                setEnableUnit(false);
            })
            .catch((err) => {
                toast.error(strings.units_loading_failed);
            });
    };

    const verifyMobileNo = () => {
        if (isNaN(userMobile)) return false;
        if (userMobile.length !== 11) return false;
        return true;
    };

    const verifyPassword = () => {
        if (
            typeof userPassword === "undefined" ||
            typeof userPasswordConfirm === "undefined"
        ) {
            setPasswordMatch(false);
            return;
        }

        if (userPassword !== userPasswordConfirm) {
            setPasswordMatch(false);
            return;
        }

        setPasswordMatch(true);
    };

    const verifyUniqueEmail = async () => {
        let config = {
            method: "post",
            url: BASE.BASE_API_URL + END_POINT.VERIFY_UNIQUE_USER,
            headers: { "Content-Type": "application/json" },
            data: {
                email: userEmail,
            },
        };

        await axios(config)
            .then((response) => {
                if (response.data.user !== null) {
                    uniqueUser = false;
                } else {
                    uniqueUser = true;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container className="app-register">
            <div className="registration-form">
                <h3 className="text-center">{strings.register}</h3>
                <Form onSubmit={registerUser}>
                    <Form.Group className="mb-3">
                        <Form.Label>{strings.name}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={strings.enter_name}
                            onChange={(e) => {
                                userName = e.target.value;
                            }}
                        />

                        <Row>
                            <Col sm={6}>
                                <Form.Label>{strings.division}</Form.Label>
                                <Form.Select
                                    aria-label={strings.select_division}
                                    onChange={(e) => {
                                        userDivision = e.target.value;
                                        getDistrictsByDivision(userDivision);
                                    }}
                                >
                                    <option>{strings.select_division}</option>
                                    {divisions.map((opt, index) => (
                                        <option value={opt.id} key={index}>
                                            {opt.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col sm={6}>
                                <Form.Label>{strings.district}</Form.Label>
                                <Form.Select
                                    aria-label={strings.select_district}
                                    disabled={enableDistrict}
                                    onChange={(e) => {
                                        userDistrict = e.target.value;
                                        getUnitsByDistrict(userDistrict);
                                    }}
                                >
                                    <option>{strings.select_district}</option>
                                    {districts.map((opt, index) => (
                                        <option value={opt.id} key={index}>
                                            {opt.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>

                        <Form.Label>{strings.unit}</Form.Label>
                        <Form.Select
                            aria-label={strings.select_unit}
                            disabled={enableUnit}
                            onChange={(e) => {
                                userUnit = e.target.value;
                            }}
                        >
                            <option>{strings.select_unit}</option>
                            {units.map((opt, index) => (
                                <option value={opt.id} key={index}>
                                    {opt.name}
                                </option>
                            ))}
                        </Form.Select>

                        <Form.Label>{strings.email}</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder={strings.enter_email}
                            onChange={(e) => {
                                userEmail = e.target.value;
                            }}
                        />

                        <Form.Label>{strings.mobile}</Form.Label>
                        <Form.Text className="text-muted">
                            {" "}
                            ({strings.mobile_digit_limit})
                        </Form.Text>
                        <Form.Control
                            type="text"
                            placeholder={strings.enter_mobile}
                            onChange={(e) => {
                                userMobile = e.target.value;
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

                        <Form.Label>{strings.confirm_password}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={strings.confirm_password}
                            id="password-confirm"
                            onChange={(e) => {
                                setPassMatchTextVisible(true);
                                userPasswordConfirm = e.target.value;
                                verifyPassword();
                            }}
                        />
                        {passwordMatch ? (
                            <Form.Text className="text-success">
                                {strings.password_match}
                            </Form.Text>
                        ) : (
                            <Form.Text
                                className="text-danger"
                                style={{
                                    display: passMatchTextVisible
                                        ? "block"
                                        : "none",
                                }}
                            >
                                {strings.password_not_match}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="submit-button"
                    >
                        {strings.submit}
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default RegisterComponent;
