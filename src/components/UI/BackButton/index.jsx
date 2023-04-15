import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./BackButton.module.scss";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function BackButton() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    return (
        <button onClick={handleClick} className={style.backButton}>
            <FaArrowAltCircleLeft /> GO BACK
        </button>
    );
}
