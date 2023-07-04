import React from "react";
import { useDispatch, useSelector } from "react-redux";

import FilterInput from "components/UI/Filter/FilterInput";
import { changeFilterThunk } from "store/characters/actions";

export default function BaseInputFilterCharacters({ fieldName, placeholder, label }) {
    const dispatch = useDispatch();
    const value = useSelector(state => state.characters.form[fieldName]);
    const debounce = (cb,) => {
        let flag;
        return function (){
            const fnCall = ()=>{cb.apply(this, arguments)}
        clearTimeout(flag);
        flag = setTimeout(fnCall, 1500);
    }};

    const handleFilterName = e => {
        dispatch(changeFilterThunk(fieldName, e.target.value));
    };

    return (
        <FilterInput
            placeholder={placeholder}
            label={label}
            value={value}
            handleFilterName={debounce(handleFilterName)}
        />
    );
}
