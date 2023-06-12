import React from "react";
import style from "./Header.module.scss";

import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../pages/constant";
import Logo from "components/UI/Logo";

export default function Header() {
    return (
        <header className={style.header}>
            <div className="container">
                <Logo />

                <div className={style.link}>
                    <div>
                        <NavLink to={ROUTES.CHARACTERS}>Characters</NavLink>
                    </div>
                    <div>
                        <NavLink to={ROUTES.LOCATIONS}>Location</NavLink>
                    </div>
                    <div>
                        <NavLink to={ROUTES.EPISODES}>Episodes</NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}
