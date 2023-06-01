import React, { useState } from "react";
import style from "../InputFilter.module.scss";

export default function FilterInput({ value, label, placeholder, handleFilterName }) {
    const [labelPosition, setLabelPosition] = useState(value === "");

    const handleOnFocus = () => {
        setLabelPosition(false);
    };
    const handleOnBlur = () => {
        setLabelPosition(value === "");
    };
    return (
        <div className={style.form_feld} onFocus={handleOnFocus} onBlur={handleOnBlur}>
            <input
                id="inputFilter"
                type="text"
                defaultValue={value}
                onChange={handleFilterName}
                placeholder={labelPosition ? undefined : placeholder}
            />

            <label htmlFor="inputFilter" className={labelPosition ? "down" : style.up}>
                {label}
            </label>
        </div>
    );
}
