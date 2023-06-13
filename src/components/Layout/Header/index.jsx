import React from "react";
import style from "./Header.module.scss";

import { ROUTES } from "../../../pages/constant";
import Logo from "components/UI/Logo";
import NavLinkButton from "components/UI/NavLinkButton";

export default function Header() {
    return (
        <header className={style.header}>
            <div className="container">
                <Logo />

                <div className={style.link}>
                    <NavLinkButton  to={ROUTES.CHARACTERS}>Characters</NavLinkButton>

                    <NavLinkButton to={ROUTES.LOCATIONS}>Location</NavLinkButton>

                    <NavLinkButton to={ROUTES.EPISODES}>Episodes</NavLinkButton>
                </div>
            </div>
        </header>
    );
}
