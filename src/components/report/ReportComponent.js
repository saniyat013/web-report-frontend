import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import "./ReportComponent.css";

import axios from "axios";
import { config as BASE } from "../../config/Config";
import * as END_POINT from "../../config/Endpoint";

import DynamicTableReportShort from "../../common/DynamicTableReportShort";
import DynamicTableReportDetailed from "../../common/DynamicTableReportDetailed";
import DynamicTableReportNotSent from "../../common/DynamicTableReportNotSent";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import LocalizedStrings from "react-localization";
import { Lang } from "../../i18n/Lang";

import ReactToPrint from "react-to-print";
import printIcon from "../../assets/images/printer.png";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

let strings = new LocalizedStrings(Lang);
var todayShortReport;
var todayDetailedReport;
var todayNotSentReport;

const ReportComponent = () => {
    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    const componentRef = React.useRef(null);
    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current;
    }, [componentRef.current]);

    const reactToPrintTrigger = React.useCallback(() => {
        return (
            <Button
                variant="outline-primary"
                className="print-btn"
                style={{ backgroundImage: `url(${printIcon})` }}
            />
        );
    }, []);

    const [isLoading1, setLoading1] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [isLoading3, setLoading3] = useState(true);

    useEffect(() => {
        getTodayShortReport();
        getTodayDetailedReport();
        getReportNotSentToday();
    }, []);

    var todaysDate = new Date();
    var todaysDateString = `${todaysDate.getDate()}/${
        todaysDate.getMonth() + 1
    }/${todaysDate.getFullYear()}`;

    const getTodayShortReport = () => {
        let config = {
            method: "get",
            url: BASE.BASE_API_URL + END_POINT.GET_TODAY_SHORT,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            params: {
                dateToday: todaysDate,
            },
        };

        axios(config)
            .then((response) => {
                todayShortReport = response.data;
                setLoading1(false);
            })
            .catch((err) => {
                toast.error(strings.data_loading_failed);
            });
    };

    const getTodayDetailedReport = () => {
        let config = {
            method: "get",
            url: BASE.BASE_API_URL + END_POINT.GET_TODAY_DETAILED,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            params: {
                dateToday: todaysDate,
            },
        };

        axios(config)
            .then((response) => {
                todayDetailedReport = response.data;
                setLoading2(false);
            })
            .catch((err) => {
                toast.error(strings.data_loading_failed);
            });
    };

    const getReportNotSentToday = () => {
        let config = {
            method: "get",
            url: BASE.BASE_API_URL + END_POINT.REPORT_NOT_SENT_TODAY,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            params: {
                dateToday: todaysDate,
            },
        };

        axios(config)
            .then((response) => {
                todayNotSentReport = response.data;
                setLoading3(false);
            })
            .catch((err) => {
                toast.error(strings.data_loading_failed);
            });
    };

    return (
        <Container className="today-report-container">
            <ReactToPrint
                // pageStyle="@page { size: A4; }"
                content={reactToPrintContent}
                documentTitle="AwesomeFileName"
                // onAfterPrint={handleAfterPrint}
                // onBeforeGetContent={handleOnBeforeGetContent}
                // onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
            <Tabs>
                <TabList>
                    <Tab>{strings.todays_short_report}</Tab>
                    <Tab>{strings.todays_report}</Tab>
                    <Tab>{strings.todays_report_not_sent}</Tab>
                </TabList>

                <Container className="mt-2" ref={componentRef}>
                    <TabPanel>
                        <h5 className="text-center">
                            {strings.balag_report} - {todaysDateString}
                        </h5>
                        {isLoading1 ? null : (
                            <div className="text-center">
                                <div className="today-report-tables">
                                    <DynamicTableReportShort
                                        tableData={todayShortReport}
                                    />
                                </div>
                            </div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        <h5 className="text-center">
                            {strings.balag_report} - {todaysDateString}
                        </h5>
                        {isLoading2 ? null : (
                            <div className="text-center">
                                <div className="today-report-tables">
                                    {todayDetailedReport.map((element) => {
                                        if (element.districts.length !== 0) {
                                            return (
                                                <DynamicTableReportDetailed
                                                    tableData={element}
                                                />
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                            </div>
                        )}
                    </TabPanel>
                    <TabPanel>
                        <h5 className="text-center">
                            {strings.todays_report_not_sent} -{" "}
                            {todaysDateString}
                        </h5>
                        {isLoading3 ? null : (
                            <div className="text-center">
                                <div className="today-report-tables">
                                    <DynamicTableReportNotSent
                                        tableData={todayNotSentReport}
                                    />
                                </div>
                            </div>
                        )}
                    </TabPanel>
                </Container>
            </Tabs>
        </Container>
    );
};

export default ReportComponent;
