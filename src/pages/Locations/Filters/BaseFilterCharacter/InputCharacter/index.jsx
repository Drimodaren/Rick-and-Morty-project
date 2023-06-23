import React from "react";
import { useDispatch, useSelector } from "react-redux";

import FilterInput from "components/UI/Filter/FilterInput";
import { changeFilterThunk } from "store/locations/actions";

export default function BaseInputFilterLocations({ fieldName, placeholder, label }) {
    const dispatch = useDispatch();
    const value = useSelector(state => state.locations.form[fieldName]);

    const handleFilterName = e => {
        dispatch(changeFilterThunk(fieldName, e.target.value));
    };

    return <FilterInput placeholder={placeholder} label={label} value={value} handleFilterName={handleFilterName} />;
}
