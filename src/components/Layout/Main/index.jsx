import React from "react";
import style from "./Main.module.scss";
import mainImage from "../../../images/Charates_Main.png";

export default function Main({ children }) {
    return (
        <main className={style.main}>
            <div className="container">
                <img src={mainImage} alt="" /> {children}
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <div className={style.leading}> 
                  <a href="1" className={style.leadingherf}>Lead More</a>
                </div>
            </div>
        </main>
    );
}
