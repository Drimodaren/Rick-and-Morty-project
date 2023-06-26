import { getCharacter, getCharacters } from "rickmortyapi";
import { getGender, getName, getPage, getSpecies, getStatus } from "./selectors";
import { actionCreators } from "store/shared/actionCreators";
import { LABEL } from "store/shared/labels";
import { debounceThunk } from "store/shared/debounceThunk";

const characterActionCreators = actionCreators(LABEL.CHARACTERS);
export const {
    changeCurrentPageAC,
    changeFormFieldAC,
    firstLoadingDataAC,
    resetPageAC,
    setErrorsAC,
    setLoadedAC,
    setLoadingAC,
    updateDataAC
} = characterActionCreators;

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


export const changeFilterThunk = (fieldName, value) => dispatch => {
    dispatch(changeFormFieldAC(fieldName, value));
    dispatch(resetPageAC());
    dispatch(debounceThunk(loadCharacters));
};
export const changeSelectThunk = (fieldName, value) => dispatch => {
    dispatch(changeFormFieldAC(fieldName, value));
    dispatch(resetPageAC());
    dispatch(asyncThunk(loadCharacters));
};

const _loadCharacters = () => async (dispatch, getState) => {
    const page = getPage(getState());
    const name = getName(getState());
    const species = getSpecies(getState());
    const gender = getGender(getState());
    const status = getStatus(getState());
    const characters = await getCharacters({ page, name, species, gender, status });
    dispatch(firstLoadingDataAC(characters.data.results));
};
export const loadCharacters = () => async (dispatch, getState) => {
    dispatch(resetPageAC());
    dispatch(asyncThunk(_loadCharacters));
};

const _loadMoreCharacters = () => async (dispatch, getState) => {
    const page = getPage(getState());
    const name = getName(getState());
    const species = getSpecies(getState());
    const gender = getGender(getState());
    const status = getStatus(getState());
    const characters = await getCharacters({ page, name, species, gender, status });

    dispatch(updateDataAC(characters.data.results));
};

export const loadMoreCharacters = () => async (dispatch, getState) => {
    dispatch(changeCurrentPageAC());
    dispatch(asyncThunk(_loadMoreCharacters));
};

const _loadCharacter = id => async (dispatch, getState) => {
    const character = await getCharacter(id);
    dispatch(firstLoadingDataAC([character.data]));
};
export const loadCharacter = id => async (dispatch, getState) => {
    dispatch(asyncThunk(_loadCharacter, id));
};
