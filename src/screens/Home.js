import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import ViewReportByDivision from "../components/viewReport/ViewReportByDivision";
import ViewReportBySingleDivision from "../components/viewReport/ViewReportBySingleDivision";
import ViewTotalReport from "../components/viewReport/ViewTotalReport";
import ViewTotalReportByDivision from "../components/viewReport/ViewTotalReportByDivision";

import LocalizedStrings from "react-localization";
import { Lang } from "../i18n/Lang";

let strings = new LocalizedStrings(Lang);

const Home = () => {
    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    return (
        <Container fluid style={{ marginTop: "20px", marginBottom: "60px" }}>
            <h5 className="text-center mb-0">{strings.country_balag_report}</h5>
            <Row>
                <Col sm={6} className="p-3">
                    <ViewTotalReport />
                </Col>
                <Col sm={6} className="p-3">
                    <ViewReportByDivision />
                </Col>
            </Row>
            <h5 className="text-center mt-3 mb-0">
                {strings.balag_report} -{" "}
                {localStorage.getItem("userDivisionName")} {strings.division}
            </h5>

            <Row>
                <Col sm={6} className="p-3">
                    <ViewTotalReportByDivision />
                </Col>
                <Col sm={6} className="p-3">
                    <ViewReportBySingleDivision />
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
