import { NavLink, } from "react-router-dom";
import style from "./Card.module.scss";
import clsx from "clsx";

export default function Card({ url, title, description, info, image, id, type }) {
    const to = `${type}/${id}`;
    return (
        <NavLink to={to} className={clsx(style.Card, image && style.CardImage)} data-testid={`Card-${id}`}>
            {image && <img src={image} alt="Card" />}
            <h1>{title}</h1>
            <h2>{description}</h2>
            {info && <h3>{info}</h3>}
        </NavLink>
    );
}
