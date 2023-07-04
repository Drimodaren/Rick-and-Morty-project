import { getCharacter, getCharacters, getEpisode } from "rickmortyapi";
import { getCharacterById, getGender, getName, getPage, getSpecies, getStatus } from "./selectors";
import { actionCreators } from "store/shared/actionCreators";
import { firstLoadingDataAC as setEpisodesAC } from "store/episodes/actions";
import { LABEL } from "store/shared/labels";
import { debounceThunk } from "store/shared/debounceThunk";
import { SET_LOADED_EPISODES, SET_RESET_EPISODES } from "./actionTypes";
import { sharedAsyncThunk } from "store/shared/sharedAsyncThunk";

const characterActionCreators = actionCreators(LABEL.CHARACTERS);
export const asyncThunk = sharedAsyncThunk(LABEL.CHARACTERS);
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

export const setLoadedEpisodesAC = () => {
    return {
        type: SET_LOADED_EPISODES
    };
};
export const setResetEpisodesAC = () => {
    return {
        type: SET_RESET_EPISODES
    };
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
    dispatch(setResetEpisodesAC());
    let character = getCharacterById(getState(), id);

    if (!character) {
        character = (await getCharacter(id)).data;

        dispatch(firstLoadingDataAC([character]));
    }

    const episodes = character.episode.map(item => Number(item.split("/").at(-1)));

    const charactersEpisode = await getEpisode(episodes);
    dispatch(setEpisodesAC(Array.isArray(charactersEpisode.data) ? charactersEpisode.data : [charactersEpisode.data]));
    dispatch(setLoadedEpisodesAC());
};
export const loadCharacter = id => async (dispatch, getState) => {
    dispatch(asyncThunk(_loadCharacter, id));
};
