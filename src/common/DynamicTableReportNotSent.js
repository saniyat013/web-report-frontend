import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import axios from "axios";
import { config as BASE } from "../config/Config";
import * as END_POINT from "../config/Endpoint";

import "./DynamicTable.css";

import { reloadPage, verifyNumber } from "./CommonFunctions";

import LocalizedStrings from "react-localization";
import { Lang } from "../i18n/Lang";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

let strings = new LocalizedStrings(Lang);

const DynamicTableReportNotSent = (props) => {
    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    const column = Object.keys(props.tableData[0]);

    const ThData = () => {
        return column.map((data, key) => {
            return <th key={key}>{data}</th>;
        });
    };

    const tdData = () => {
        return props.tableData.map((data, key) => {
            return (
                <tr key={key}>
                    <td>{data.unitName}</td>
                    <td>{data.name}</td>
                    <td>{data.mobile}</td>
                </tr>
            );
        });
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>{strings.unit}</th>
                    <th>{strings.name}</th>
                    <th>{strings.mobile}</th>
                </tr>
            </thead>
            <tbody>{tdData()}</tbody>
        </table>
    );
};

export default DynamicTableReportNotSent;
