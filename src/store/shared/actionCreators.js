import { normalizeData } from "utils/normalizeData";
import {
    changeCurrentPage,
    changeFormField,
    firstLoadingData,
    resetPage,
    setErrors,
    setLoaded,
    setLoadedResidents,
    setLoading,
    setResetResidents,
    updateData
} from "./sharedActionTypes";

export const actionCreators = label => {
    return {
        setLoadingAC: () => ({ type: setLoading(label) }),
        setLoadedAC: () => ({ type: setLoaded(label) }),
        firstLoadingDataAC: data => {
            const { byId, allIds } = normalizeData(data);
            return {
                type: firstLoadingData(label),
                byId,
                allIds
            };
        },
        setErrorsAC: message => ({ type: setErrors(label), message }),
        changeCurrentPageAC: () => ({ type: changeCurrentPage(label) }),
        resetPageAC: () => ({ type: resetPage(label) }),
        updateDataAC: data => {
            const { byId, allIds } = normalizeData(data);
            return {
                type: updateData(label),
                byId,
                allIds
            };
        },
        changeFormFieldAC: (fieldName, value) => ({ type: changeFormField(label), fieldName, value }),
        setLoadedResidentsAC: () => {
            return {
                type: setLoadedResidents(label)
            };
        },
        setResetResidentsAC: () => {
            return {
                type: setResetResidents(label)
            };
        }
    };
};
