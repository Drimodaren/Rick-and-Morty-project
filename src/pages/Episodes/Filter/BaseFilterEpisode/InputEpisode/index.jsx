import FilterInput from "components/UI/Filter/FilterInput";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterThunk } from "store/episodes/actions";
import { getInputName } from "store/episodes/selectors";

export default function InputEpisode({ fieldName, label, placeholder }) {
    const dispatch = useDispatch();
    const value = useSelector(state => getInputName(state, fieldName));
    

    const handleFilterName = useCallback(
        e => {
            dispatch(changeFilterThunk(fieldName, e.target.value));
        },
        [dispatch, fieldName]
    );
    return (
    
            <FilterInput value={value} label={label} placeholder={placeholder} handleFilterName={handleFilterName} />
        
    );
}
