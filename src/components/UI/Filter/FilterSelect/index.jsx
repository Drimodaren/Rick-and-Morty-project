import React from "react";
import style from "../InputFilter.module.scss";

export default function FilterSelect({ value, placeholder, handleSelectName, children }) {
    return (
        <div className={style.form_field}>
            <select value={value} type="text" onChange={handleSelectName} placeholder={placeholder}>
                <option value="">--{placeholder}--</option>
                {children}
            </select>
        </div>
    );
}
