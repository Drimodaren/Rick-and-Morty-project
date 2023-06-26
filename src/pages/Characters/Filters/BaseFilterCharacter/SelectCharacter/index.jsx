import FilterSelect from "components/UI/Filter/FilterSelect";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectThunk } from "store/characters/actions";

export default function BaseSelectFilterCharacters({ fieldName, placeholder, children }) {
    const dispatch = useDispatch();
    const value = useSelector(state => state.characters.form[fieldName]);

    const handleSelectName = e => {
        dispatch(changeSelectThunk(fieldName, e.target.value));
    };

    return (
        <FilterSelect value={value} handleSelectName={handleSelectName} children={children} placeholder={placeholder} />
    );
}
