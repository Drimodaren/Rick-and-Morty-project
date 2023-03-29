import React from "react";
import style from "./main.module.scss";
import mainImage from "../../../images/Charates_Main.png";

export default function Main({ children }) {
    return (
        <main className={style.main}>
            <div>
                <img src={mainImage} alt="" className={style.mainImage} /> {children}
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
            </div>
        </main>
    );
}
