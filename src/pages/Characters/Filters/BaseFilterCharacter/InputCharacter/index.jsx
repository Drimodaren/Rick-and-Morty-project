import React from "react";
import { useDispatch, useSelector } from "react-redux";

import FilterInput from "components/UI/Filter/FilterInput";
import { changeFilterThunk } from "store/characters/slice";

export default function BaseInputFilterCharacters({ fieldName, placeholder, label }) {
    const dispatch = useDispatch();
    const value = useSelector(state => state.characters.form[fieldName]);

    const handleFilterName = e => {
        console.log(e.target.value);
        dispatch(changeFilterThunk(fieldName, e.target.value));
    };

    return <FilterInput placeholder={placeholder} label={label} value={value} handleFilterName={handleFilterName} />;
}
