import React from "react";
import "./Footer.css";

import LocalizedStrings from "react-localization";
import { Lang } from "../../i18n/Lang";
let strings = new LocalizedStrings(Lang);

const Footer = () => {
    strings.setLanguage(
        localStorage.getItem("appLanguage") === null
            ? ""
            : localStorage.getItem("appLanguage")
    );

    return (
        <footer className="app-footer">
            <div className="container text-center my-2">
                <p className="m-0">&copy; {strings.copyright_text}</p>
            </div>
        </footer>
    );
};

export default Footer;
