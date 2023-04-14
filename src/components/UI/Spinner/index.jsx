import React from "react";
import style from "./Spinner.module.css";

export function Spinner() {
    console.log("spinner");
    console.log(style);
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
