import React from "react";
import style from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className="container">
                <div>
                    <a href="https://github.com/Drimodaren">Created by Drimodaren </a>
                </div>
            </div>
        </footer>
    );
}
