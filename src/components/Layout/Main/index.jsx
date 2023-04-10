import React, { useEffect } from "react";
import style from "./Main.module.scss";
import mainImage from "../../../images/Charates_Main.png";
import { useDispatch, useSelector } from "react-redux";
import { loadCharaсters } from "../../../store/characters/actions";
import Card from "../../UI/Card";
import { getAllCharacters } from "../../../store/characters/selectors";

export default function Main({ children }) {
    const dispatch = useDispatch();
    const characters = useSelector(getAllCharacters);
    console.log(characters);

    useEffect(() => {
        dispatch(loadCharaсters());
    }, [dispatch]);
    return (
        <main className={style.main}>
            <div className="container">
                <img src={mainImage} alt="" /> {children}
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <div className={style.leading}>
                    <a href="1" className={style.leadingherf}>
                        Lead More
                    </a>
                    {characters.map(item => (
                        <Card key={item.id} title={item.name} />
                    ))}
                </div>
            </div>
        </main>
    );
}
