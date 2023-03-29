import React from "react";
import style from "./Header.module.scss";
import logo from "../../../images/logo.png";

export default function Header() {
    return (
        <header className={style.header}>
            <div className="container">
                <img src={logo} alt="" />
                <div className={style.link}>
                    <a href="1">Charaters</a>
                    <a href="1">Location</a>
                    <a href="1">Episodes</a>
                </div>
            </div>
        </header>
    );
}
