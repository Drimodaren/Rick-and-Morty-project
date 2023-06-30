import FilterInput from "components/UI/Filter/FilterInput";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFormFieldAC } from "store/episodes/actions";
import { changeName } from "store/episodes/selectors";

export default function InputEpisode({ fieldName, label, placeholder }) {
    const dispatch = useDispatch();
    const value = useSelector(state => changeName(state, fieldName));

    const handleFilterName = e => {
      debugger
        dispatch(changeFormFieldAC(fieldName, e.target.value));
    };
    return (
        <div>
            <FilterInput value={value} label={label} placeholder={placeholder} handleFilterName={handleFilterName} />
        </div>
    );
}
