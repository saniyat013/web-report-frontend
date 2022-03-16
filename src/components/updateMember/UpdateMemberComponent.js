import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import { config as BASE } from "../../config/Config";
import * as END_POINT from "../../config/Endpoint";

import "./UpdateMemberComponent.css";

import { reloadPage, verifyNumber } from "../../common/CommonFunctions";

import LocalizedStrings from "react-localization";
import { Lang } from "../../i18n/Lang";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

let strings = new LocalizedStrings(Lang);

var updatedMembers;

const UpdateMemberComponent = () => {
    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    const [currentMembers, setCurrentMembers] = useState("");

    useEffect(() => {
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

    const updateMember = (e) => {
        e.preventDefault();

        if (updatedMembers === undefined) {
            toast.error(strings.fill_all_fields);
        } else if (verifyNumber(updatedMembers)) {
            toast.error(strings.invalid_number);
        } else {
            let config = {
                method: "post",
                url:
                    BASE.BASE_API_URL +
                    END_POINT.UPDATE_MEMBERS_BY_UNIT +
                    localStorage.getItem("userUnit"),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "userToken"
                    )}`,
                },
                data: {
                    members: updatedMembers,
                },
            };

            axios(config)
                .then((response) => {
                    toast.success(strings.member_update_success);
                    setTimeout(() => {
                        reloadPage();
                    }, 3000);
                })
                .catch((err) => {
                    toast.error(strings.member_update_fail);
                });
        }
    };

    return (
        <Container className="app-member-update">
            <div className="member-update-form">
                <Form onSubmit={updateMember}>
                    <Form.Group className="mb-3">
                        <Form.Label>{strings.current_members}</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentMembers}
                            disabled={true}
                        />

                        <Form.Label>{strings.update_members_input}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={strings.enter_updated_members}
                            onChange={(e) => {
                                updatedMembers = e.target.value;
                            }}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="submit-button"
                    >
                        {strings.update}
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default UpdateMemberComponent;
