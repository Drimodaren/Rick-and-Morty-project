import { getCharacter, getCharacters } from "rickmortyapi";
import {
    CHANGE_CURRENT_PAGE,
    CHANGE_FORM_FIELD,
    ERRORS_CHARACTER,
    LOAD_MORE,
    PAGE_RESET,
    SET_CHARACTERS,
    SET_GENDER,
    SET_LOADED,
    SET_LOADING,
    SET_NAME,
    SET_SPECIES,
    SET_STATUS
} from "./actionTypes";
import { getGender, getName, getPage, getSpecies, getStatus } from "./selectors";

export const setCharactersAC = characters => {
    return {
        type: SET_CHARACTERS,
        characters
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

export const setErrorsAC = message => {
    return {
        type: ERRORS_CHARACTER,
        message
    };
};

export const changeCurrentPageAC = () => {
    return {
        type: CHANGE_CURRENT_PAGE
    };
};
export const pageResetAC = () => {
    return {
        type: PAGE_RESET
    };
};
export const loadMoreAc = characters => {
    return {
        type: LOAD_MORE,
        characters
    };
};
export const nameAC = name => {
    return {
        type: SET_NAME,
        name
    };
};
export const speciesAC = species => {
    return {
        type: SET_SPECIES,
        species
    };
};
export const statusAC = status => {
    return {
        type: SET_STATUS,
        status
    };
};
export const genderAC = gender => {
    return {
        type: SET_GENDER,
        gender
    };
};
export const changeFormFieldAC = (fieldName, value) => {
    return {
        type: CHANGE_FORM_FIELD,
        fieldName,
        value
    };
};

export const asyncThunk =
    (cb, ...args) =>
    async (dispatch, getState) => {
        dispatch(setLoadingAC());
        try {
            await dispatch(cb(...args));
        } catch (e) {
            console.log(e);
            dispatch(setErrorsAC(e.message));
        } finally {
            dispatch(setLoadedAC());
        }
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
    dispatch(debounceThunk(loadCharacters));
};
export const changeSelectThunk = (fieldName, value) => dispatch => {
    dispatch(changeFormFieldAC(fieldName, value));
    dispatch(pageResetAC());
    dispatch(asyncThunk(loadCharacters));
};

const _loadCharacters = () => async (dispatch, getState) => {
    const page = getPage(getState());
    const name = getName(getState());
    const species = getSpecies(getState());
    const gender = getGender(getState());
    const status = getStatus(getState());
    const characters = await getCharacters({ page, name, species, gender, status });
    // if (characters.status !== 200) {
    //     throw new Error(characters.statusMessage || "Случилась хуйня");
    // }
   
//dispatch(speciesAC())
    dispatch(setCharactersAC(characters.data.results));
};
export const loadCharacters = () => async (dispatch, getState) => {
    dispatch(asyncThunk(_loadCharacters));
};

const _loadMoreCharacters = () => async (dispatch, getState) => {
    const page = getPage(getState());
    const name = getName(getState());
    const species = getSpecies(getState());
    const gender = getGender(getState());
    const status = getStatus(getState());
    const characters = await getCharacters({ page, name, species, gender, status });
    
    dispatch(loadMoreAc(characters.data.results));
};

export const loadMoreCharacters = () => async (dispatch, getState) => {
    dispatch(changeCurrentPageAC());
    dispatch(asyncThunk(_loadMoreCharacters));
};

const _loadCharacter = id => async (dispatch, getState) => {
    const character = await getCharacter(id);
    dispatch(setCharactersAC([character.data]));
};
export const loadCharacter = id => async (dispatch, getState) => {
    dispatch(asyncThunk(_loadCharacter, id));
};
