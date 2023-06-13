import React from "react";
import style from "./Spinner.module.scss";

export function Spinner() {
    return (
        <div className={style.spinerWrapper}>
            <div className={style["lds-roller"]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
