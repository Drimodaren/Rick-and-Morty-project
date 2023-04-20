import React from "react";
import style from "./header.module.scss";
import logo from "../../../images/logo.png";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../pages/constant";

export default function Header() {
    return (
        <header className={style.header}>
            <div className="container">
                <NavLink to={"./"}>
                    <img src={logo} alt="" />
                </NavLink>

                <div className={style.link}>
                    <NavLink to={ROUTES.CHARACTERS}>Characters</NavLink>
                    <NavLink to={ROUTES.LOCATIONS}>Location</NavLink>
                    <NavLink to={ROUTES.EPISODES}>Episodes</NavLink>
                </div>
            </div>
        </header>
    );
}
