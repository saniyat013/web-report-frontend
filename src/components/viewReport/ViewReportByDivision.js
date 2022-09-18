import React, { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import { Button } from "react-bootstrap";

import axios from "axios";
import { config as BASE } from "../../config/Config";
import * as END_POINT from "../../config/Endpoint";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import DatePicker from "react-datepicker";

import "./ViewReport.css";

import LocalizedStrings from "react-localization";
import { Lang } from "../../i18n/Lang";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

let strings = new LocalizedStrings(Lang);

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const ViewReportByDivision = () => {
    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );
    
    const [labels, setLabels] = useState([]);
    const [dataSet, setDataSet] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    var ed = new Date();
    ed.setDate(ed.getDate() + 1);
    const [endDate, setEndDate] = useState(ed);

    const getReportByDivision = () => {
        let config = {
            method: "get",
            url: BASE.BASE_API_URL + END_POINT.GET_REPORT_BY_DIVISION,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            params: {
                dateFrom: startDate,
                dateTo: endDate,
            },
        };

        axios(config)
            .then((response) => {
                if (response.data.length === 0) {
                    toast.info(strings.no_data_found);
                } else {
                    var lbls = [];
                    var dtset = [];
                    for (var item of response.data) {
                        lbls.push(item.division);
                        dtset.push(item.totalWork);
                    }
                    setLabels(lbls);
                    setDataSet(dtset);
                }
            })
            .catch((err) => {
                toast.error(strings.data_loading_failed);
            });
    };

    const data = {
        labels,
        datasets: [
            {
                data: dataSet,
                borderColor: "#9ad0f5",
                backgroundColor: "#9ad0f580",
            },
        ],
    };

    const options = {
        indexAxis: "y",
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            datalabels: {
                display: true,
                color: "black",
                align: "start",
                anchor: "end",
                font: { size: "14", weight: "bold" },
            },
            legend: {
                display: false,
                // position: "right",
            },
            title: {
                display: false,
                text: "Chart.js Horizontal Bar Chart",
            },
        },
    };

    return (
        <div className="report-container">
            <div className="date-range-box">
                <span style={{ flex: "25%" }}>{strings.select_date}:</span>
                <div
                    style={{
                        display: "flex",
                        flex: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                    <span> - </span>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                    />
                </div>

                <Button
                    className="get-report-btn"
                    variant="primary"
                    onClick={getReportByDivision}
                    style={{ flex: "25%" }}
                >
                    {strings.show}
                </Button>
            </div>
            <Bar options={options} data={data} />
            <h5 className="report-header">{strings.todays_short_report}</h5>
        </div>
    );
};

export default ViewReportByDivision;
