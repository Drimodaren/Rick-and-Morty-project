import { ROUTES } from "pages/constant";
import React from "react";
import { NavLink } from "react-router-dom";
import characterImg from "../../images/Charates_Main.png";
import episodeImg from "../../images/Episodes_Main.png";
import locationImg from "../../images/Lockation_Main.png";
import style from "./MainPage.module.scss";

export default function MainPage() {
    return (
        <div className={style.mainDiv}>
            <div className={style.MainPage}>
                <div className={style.link}>
                    <NavLink to={ROUTES.CHARACTERS}>
                        <img src={characterImg} alt="Character main" />
                    </NavLink>

                    <h1>CHARACTERS</h1>
                </div>
                <div className={style.secondDiv}>
                    <div className={style.link}>
                        <NavLink to={ROUTES.EPISODES}>
                            <img src={episodeImg} alt="Episode main" />
                        </NavLink>
                        <h1> EPISODES</h1>
                    </div>
                    <div className={style.link}>
                        <NavLink to={ROUTES.LOCATIONS}>
                            <img src={locationImg} alt="Location main" />
                        </NavLink>
                        <h1>LOCATIONS</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
