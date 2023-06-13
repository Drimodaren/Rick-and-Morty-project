import { ROUTES } from "pages/constant";
import React from "react";
import logo from "../../../images/logo.png";
import { NavLink } from "react-router-dom";
import style from "./Logo.module.scss"

export default function Logo() {
    return (
        <NavLink to={ROUTES.MAIN} >
            <img src={logo} alt="" />
        </NavLink>
    );
}
