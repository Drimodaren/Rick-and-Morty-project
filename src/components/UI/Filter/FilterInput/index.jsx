import React, { useMemo, useState } from "react";
import style from "../InputFilter.module.scss";
import { debounce } from "utils/debounce";

export default function FilterInput({ value, label, placeholder, handleFilterName }) {
    const [labelPosition, setLabelPosition] = useState(value === "");
    const [inputValue, setInputValue] = useState(value ?? "");

    const debouncedCb = useMemo(() => debounce(handleFilterName), [handleFilterName]);
    const handleOnFocus = () => {
        setLabelPosition(false);
    };
    const handleOnBlur = () => {
        setLabelPosition(value === "");
    };
    const handleChange = e => {
        setInputValue(e.target.value);
        debouncedCb(e);
    };
    return (
        <div className={style.form_field} onFocus={handleOnFocus} onBlur={handleOnBlur}>
            <input
                id="inputFilter"
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder={labelPosition ? undefined : placeholder}
            />

            <label htmlFor="inputFilter" className={labelPosition ? "down" : style.up}>
                {label}
            </label>
        </div>
    );
}
