import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterThunk } from "store/characters/actions";
import style from "./InputFilter.module.scss";

export default function BaseFilterCharacters({ fieldName, placeholder, label }) {
    const dispatch = useDispatch();
    const value = useSelector(state => state.character.form[fieldName]);
    const [labelPosition, setLabelPosition] = useState(value === ""); // input

    const handleFilterName = e => {
        dispatch(changeFilterThunk(fieldName, e.target.value));
    };
    const handleOnFocus = () => {
        setLabelPosition(false);
    };
    const handleOnBlur = () => {
        setLabelPosition(value === "");
    };
    return (
        <div className={style.form_feld} onFocus={handleOnFocus} onBlur={handleOnBlur}>
            <input id='inputFilter' type="text" value={value} onChange={handleFilterName} placeholder={labelPosition?undefined:placeholder} />

            <label htmlFor='inputFilter' className={labelPosition ? "down" : style.up}>{label}</label>
        </div>
    );
}
