import React, { useEffect } from "react";
import style from "./Card.module.scss";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { loadCharaters } from "../../../store/characters/actions";

export default function Card({ url, title, description, info, image, id }) {
   
    return (
        <div className={clsx(style.Card, image && style.CardImage)} data-testid={`Card-${id}`}>
            {image && <img src={image} alt="Card" />}
            <h1>{title}</h1>
            <h2>{description}</h2>
            {info && <h3>{info}</h3>}
        </div>
    );
}
