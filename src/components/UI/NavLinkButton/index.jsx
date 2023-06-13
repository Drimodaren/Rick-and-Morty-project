import React from "react";
import { NavLink } from "react-router-dom";
import style from "./NavLinkButton.module.scss";
import clsx from "clsx";

export default function NavLinkButton(props) {
    return (
        <NavLink
            {...props}
            className={({ isActive }) => clsx(style.baseNavlink, props.className, isActive && style.activeNavlink)}
        />
    );
}
