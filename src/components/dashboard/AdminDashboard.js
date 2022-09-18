import React, { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { config as BASE } from "../../config/Config";
import * as END_POINT from "../../config/Endpoint";

import "./AdminDashboard.css";

import { reloadPage, verifyNumber } from "../../common/CommonFunctions";
import ReactToPrint from "react-to-print";
import printIcon from "../../assets/images/printer.png";

import DynamicTable from "../../common/DynamicTable";

import LocalizedStrings from "react-localization";
import { Lang } from "../../i18n/Lang";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

let strings = new LocalizedStrings(Lang);

const AdminDashboard = () => {
    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    // const componentRef = React.useRef(null);
    // const reactToPrintContent = React.useCallback(() => {
    //     return componentRef.current;
    // }, [componentRef.current]);

    // const reactToPrintTrigger = React.useCallback(() => {
    //     return (
    //         <Button
    //             variant="outline-primary"
    //             className="print-btn"
    //             style={{ backgroundImage: `url(${printIcon})` }}
    //         />
    //     );
    // }, []);

    const [isLoading, setLoading] = useState(true);
    const [newUsers, setNewUsers] = useState();

    useEffect(() => {
        getNewUsers();
    }, []);

    const getNewUsers = () => {
        let config = {
            method: "get",
            url: BASE.BASE_API_URL + END_POINT.GET_NEW_USERS,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        };

        axios(config)
            .then((response) => {
                if (response.data.user.length === 0) {
                    toast.info(strings.no_new_user);
                } else {
                    setNewUsers(response.data.user);
                    setLoading(false);
                }
            })
            .catch((err) => {
                toast.error(strings.user_loading_failed);
            });
    };

    return (
        <div>
            {/* <Container>
                <div className="print-btn-div">
                    <ReactToPrint
                        content={reactToPrintContent}
                        documentTitle="AwesomeFileName"
                        // onAfterPrint={handleAfterPrint}
                        // onBeforeGetContent={handleOnBeforeGetContent}
                        // onBeforePrint={handleBeforePrint}
                        removeAfterPrint
                        trigger={reactToPrintTrigger}
                    />
                </div>
            </Container> */}
            {/* <Container className="mt-2" ref={componentRef}> */}
            <Container className="mt-3">
                <h5 className="text-center mb-0">{strings.newly_registered}</h5>
                {isLoading ? null : <DynamicTable tableData={newUsers} />}
            </Container>
        </div>
    );
};

export default AdminDashboard;
