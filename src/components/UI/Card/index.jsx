import React from "react";
import style from "./Card.module.scss";
import clsx from "clsx";

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
