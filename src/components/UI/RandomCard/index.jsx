import React from "react";
import { NavLink } from "react-router-dom";

export default function RandomCard({fineText, maxCard}) {


    const randomID = Math.floor(Math.random() * (maxCard - 1)) * 1;
    return (
        <NavLink to={`${randomID}`}>
            <p>{fineText}</p>
        </NavLink>
    );
}
