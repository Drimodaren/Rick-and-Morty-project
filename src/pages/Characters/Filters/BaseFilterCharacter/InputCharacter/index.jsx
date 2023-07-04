import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import FilterInput from "components/UI/Filter/FilterInput";
import { changeFilterThunk } from "store/characters/actions";

export default function BaseInputFilterCharacters({ fieldName, placeholder, label }) {
    const dispatch = useDispatch();
    const value = useSelector(state => state.characters.form[fieldName]);

    const handleFilterName = useCallback(
        e => {
            dispatch(changeFilterThunk(fieldName, e.target.value));
        },
        [dispatch, fieldName]
    );

    return <FilterInput placeholder={placeholder} label={label} value={value} handleFilterName={handleFilterName} />;
}
