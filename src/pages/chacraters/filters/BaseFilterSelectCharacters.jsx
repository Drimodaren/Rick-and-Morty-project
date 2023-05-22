import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterThunk } from "store/characters/actions";
import style from "./InputFilter.module.scss";

export default function BaseSelectCharacters({ fieldName, placeholder, children }) {
    const dispatch = useDispatch();
    const value = useSelector(state => state.character.form[fieldName]);

    const handleSelectName = e => {
        dispatch(changeFilterThunk(fieldName, e.target.value));
    };

    return (
        <div className={style.form_feld} >
        <select value={value} type="text" onChange={handleSelectName} placeholder={placeholder}>
            <option value="">
                --{placeholder}--
            </option>
            {children}
        </select>
        </div>
    );
}
