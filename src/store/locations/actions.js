import { normalizeData } from "utils/normalizeData";
import { getCharacter, getLocation, getLocations } from "rickmortyapi";
import {
    CHANGE_CURRENT_PAGE,
    CHANGE_FORM_FIELD,
    ERRORS_LOCATIONS,
    LOAD_MORE,
    PAGE_RESET,
    SET_LOADED,
    SET_LOADED_RESIDENTS,
    SET_LOADING,
    SET_LOCATIONS,
    SET_RESET_RESIDENTS
} from "./actionTypes";
import { getDimension, getName, getPage, getType } from "./selectors";
import { setCharactersAC } from "store/characters/actions";

export const setLocationsAC = locations => {
    const { byId, allIds } = normalizeData(locations);
    return {
        type: SET_LOCATIONS,
        byId,
        allIds
    };
};
export const setLoadingAC = () => {
    return {
        type: SET_LOADING
    };
};

export const setLoadedAC = () => {
    return {
        type: SET_LOADED
    };
};
export const setLoadedResidentsAC = () => {
    return {
        type: SET_LOADED_RESIDENTS
    };
};
export const setResetResidentsAC = () => {
    return {
        type: SET_RESET_RESIDENTS
    };
};

export const setErrorsAC = message => {
    return {
        type: ERRORS_LOCATIONS,
        message
    };
};
export const pageResetAC = () => {
    return {
        type: PAGE_RESET
    };
};
export const changeCurrentPageAC = () => {
    return {
        type: CHANGE_CURRENT_PAGE
    };
};
export const loadMoreAc = characters => {
    const { byId, allIds } = normalizeData(characters);
    return {
        type: LOAD_MORE,
        byId,
        allIds
    };
};
export const changeFormFieldAC = (fieldName, value) => {
    return {
        type: CHANGE_FORM_FIELD,
        fieldName,
        value
    };
};

export const debounceThunk =
    (cb, ...arg) =>
    dispatch => {
        let flag = null;
        if (!flag) {
            flag = setTimeout(() => {
                dispatch(cb(...arg));
            }, 1500);
        } else {
            clearTimeout(flag);
        }
    };
export const changeFilterThunk = (fieldName, value) => dispatch => {
    dispatch(changeFormFieldAC(fieldName, value));
    dispatch(pageResetAC());
    dispatch(debounceThunk(loadLocations));
};
export const changeSelectThunk = (fieldName, value) => dispatch => {
    dispatch(changeFormFieldAC(fieldName, value));
    dispatch(pageResetAC());
    dispatch(asyncThunk(loadLocations));
};

export const asyncThunk =
    (cb, ...args) =>
    async (dispatch, getState) => {
        dispatch(setLoadingAC());
        try {
            await dispatch(cb(...args));
        } catch (e) {
            dispatch(setErrorsAC(e.message));
        } finally {
            dispatch(setLoadedAC());
        }
    };

const _loadLocations = () => async (dispatch, getState) => {
    const page = getPage(getState());
    const name = getName(getState());
    const type = getType(getState());
    const dimension = getDimension(getState());

    const locations = await getLocations({ page, name, type, dimension });
    dispatch(setLocationsAC(locations.data.results));
};
export const loadLocations = () => async (dispatch, getState) => {
    dispatch(pageResetAC());
    dispatch(asyncThunk(_loadLocations));
};

const _loadMoreLocations = () => async (dispatch, getState) => {
    const page = getPage(getState());
    const name = getName(getState());
    const type = getType(getState());
    const dimension = getDimension(getState());
    const locations = await getLocations({ page, name, type, dimension });

    dispatch(loadMoreAc(locations.data.results));
};

export const loadMoreLocations = () => async (dispatch, getState) => {
    dispatch(changeCurrentPageAC());
    dispatch(asyncThunk(_loadMoreLocations));
};

const _loadLocation = id => async (dispatch, getState) => {
    dispatch(setResetResidentsAC());
    const location = await getLocation(id);
    dispatch(setLocationsAC([location.data]));
    const residents = location.data.residents.map(item => Number(item.split("/").at(-1)));
    const charactersLocation = await getCharacter(residents);
    dispatch(
        setCharactersAC(Array.isArray(charactersLocation.data) ? charactersLocation.data : [charactersLocation.data])
    );
    dispatch(setLoadedResidentsAC());
};
export const loadLocation = id => async (dispatch, getState) => {
    dispatch(asyncThunk(_loadLocation, id));
};
