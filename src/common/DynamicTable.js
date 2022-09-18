import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import axios from "axios";
import { config as BASE } from "../config/Config";
import * as END_POINT from "../config/Endpoint";

import "./DynamicTable.css";

import { reloadPage, verifyNumber } from "../common/CommonFunctions";

import LocalizedStrings from "react-localization";
import { Lang } from "../i18n/Lang";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

let strings = new LocalizedStrings(Lang);

const DynamicTable = (props) => {
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
                    {column.map((v, key) => {
                        return <td key={key}>{data[v]}</td>;
                    })}
                    <td>
                        <Button
                            id={key}
                            className="verify-btn"
                            onClick={(event) => {
                                verifyUser(data.ID, event.target);
                            }}
                        >
                            {strings.verify}
                        </Button>
                    </td>
                </tr>
            );
        });
    };

    const verifyUser = (selectedId, deleteTarget) => {
        let config = {
            method: "post",
            url: BASE.BASE_API_URL + END_POINT.VERIFY_USER,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            data: {
                id: selectedId,
            },
        };

        axios(config)
            .then((response) => {
                if (response.data === 1) {
                    toast.info(strings.user_verified);
                    deleteRow(deleteTarget);
                }
            })
            .catch((err) => {
                toast.error(strings.user_verification_failed);
            });
    };

    const deleteRow = (el) => {
        // if(!confirm("Are you sure you want to delete?")) return;
        var tbl = el.parentNode.parentNode.parentNode;
        var row = el.parentNode.parentNode.rowIndex - 1;

        tbl.deleteRow(row);
        // tbl.refresh();
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    {ThData()}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>{tdData()}</tbody>
        </table>
    );
};

export default DynamicTable;
