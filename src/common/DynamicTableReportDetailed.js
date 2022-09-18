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

const DynamicTableReportDetailed = (props) => {
    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    var sumMember = 0;
    var sumId = 0;
    var sumWork = 0;
    const column = Object.keys(props.tableData.districts[0]);

    const ThData = () => {
        return column.map((data, key) => {
            return <th key={key}>{data}</th>;
        });
    };

    const tdData = () => {
        return props.tableData.districts.map((data, key) => {
            sumMember += data.totalMember;
            sumId += data.totalId;
            sumWork += data.totalWorkToday;

            return (
                <tr key={key}>
                    {/* {if(key === 0) {
                        <td>{props.tableData.name}</td>
                    }} */}
                    {key === 0 ? (
                        <td rowSpan={3} className="detailed-report-rowspan">
                            {props.tableData.name}
                        </td>
                    ) : null}
                    <td>{data.name}</td>
                    <td>{data.totalMember}</td>
                    <td>{data.totalId}</td>
                    <td>{data.totalWorkToday}</td>
                </tr>
            );
        });
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>{strings.division}</th>
                    <th>{strings.district}</th>
                    <th>{strings.total_member}</th>
                    <th>{strings.total_id}</th>
                    <th>{strings.total_work}</th>
                </tr>
            </thead>
            <tbody>
                {tdData()}
                <tr>
                    <td colSpan={2}>{strings.total}</td>
                    <td>{sumMember}</td>
                    <td>{sumId}</td>
                    <td>{sumWork}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default DynamicTableReportDetailed;
