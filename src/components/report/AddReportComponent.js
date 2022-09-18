import React, { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { config as BASE } from "../../config/Config";
import * as END_POINT from "../../config/Endpoint";

import "./AddReportComponent.css";

import { reloadPage, verifyNumber } from "../../common/CommonFunctions";

import LocalizedStrings from "react-localization";
import { Lang } from "../../i18n/Lang";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

let strings = new LocalizedStrings(Lang);

var currentDate;
var workedOnTodaysPost;
var workedIds;
var comment;

const AddReportComponent = () => {
    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    const [currentMembers, setCurrentMembers] = useState("");

    useEffect(() => {
        // console.log(localStorage.getItem("userID"));
        // console.log(localStorage.getItem("userEmail"));
        // console.log(localStorage.getItem("userDivision"));
        // console.log(localStorage.getItem("userDistrict"));
        // console.log(localStorage.getItem("userUnit"));
        // console.log(localStorage.getItem("userToken"));
        // console.log(localStorage.getItem("userDivisionName"));
        // console.log(localStorage.getItem("userDistrictName"));
        // console.log(localStorage.getItem("userUnitName"));
        getCurrentMembers();
    }, []);

    const getCurrentMembers = () => {
        let config = {
            method: "get",
            url:
                BASE.BASE_API_URL +
                END_POINT.GET_MEMBERS_BY_UNIT +
                localStorage.getItem("userUnit"),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        };

        axios(config)
            .then((response) => {
                setCurrentMembers(response.data.members);
            })
            .catch((err) => {
                toast.error(strings.member_loading_fail);
            });
    };

    const saveReport = (e) => {
        e.preventDefault();

        if (
            currentDate === undefined ||
            workedOnTodaysPost === undefined ||
            workedIds === undefined
        ) {
            toast.error(strings.fill_all_fields);
        } else if (
            verifyNumber(workedOnTodaysPost) ||
            verifyNumber(workedIds)
        ) {
            toast.error(strings.invalid_number);
        } else {
            let config = {
                method: "post",
                url: BASE.BASE_API_URL + END_POINT.SAVE_REPORT,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "userToken"
                    )}`,
                },
                data: {
                    division_id: localStorage.getItem("userDivision"),
                    district_id: localStorage.getItem("userDistrict"),
                    unit_id: localStorage.getItem("userUnit"),
                    created_at: currentDate,
                    total_work: workedOnTodaysPost,
                    total_id: workedIds,
                    comment: comment,
                },
            };

            axios(config)
                .then((response) => {
                    toast.success(strings.report_saved);
                    setTimeout(() => {
                        reloadPage();
                    }, 3000);
                })
                .catch((err) => {
                    toast.error(strings.report_save_fail);
                });
        }
    };

    return (
        <Container className="app-report">
            <div className="report-form">
                <h3 className="text-center">{strings.report}</h3>
                <Form onSubmit={saveReport}>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col sm={6}>
                                <Form.Label>{strings.division}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={localStorage.getItem(
                                        "userDivisionName"
                                    )}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={6}>
                                <Form.Label>{strings.district}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={localStorage.getItem(
                                        "userDistrictName"
                                    )}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label>{strings.unit}</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={localStorage.getItem("userUnitName")}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={6}>
                                <Form.Label>{strings.date}*</Form.Label>
                                <Form.Control
                                    type="date"
                                    onChange={(e) => {
                                        currentDate = e.target.value;
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <Form.Label>
                                    {strings.unit_total_member}
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled={true}
                                    value={currentMembers}
                                />
                            </Col>
                            <Col sm={6}>
                                <Form.Label>{strings.worked_today}*</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={strings.worked_today}
                                    onChange={(e) => {
                                        workedOnTodaysPost = e.target.value;
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <Form.Label>
                                    {strings.worked_id_today}*
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={strings.worked_id_today}
                                    onChange={(e) => {
                                        workedIds = e.target.value;
                                    }}
                                />
                            </Col>
                            <Col sm={6}>
                                <Form.Label>{strings.comment}</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={strings.comment}
                                    onChange={(e) => {
                                        comment = e.target.value;
                                    }}
                                />
                            </Col>
                        </Row>
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

export default AddReportComponent;
