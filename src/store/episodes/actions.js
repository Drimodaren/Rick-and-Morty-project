import { getCharacter, getEpisode, getEpisodes } from "rickmortyapi";
import { actionCreators } from "store/shared/actionCreators";
import { firstLoadingDataAC as setCharactersAC } from "store/characters/actions";
import { debounceThunk } from "store/shared/debounceThunk";
import { LABEL } from "store/shared/labels";
import { getEpisodesById, getName, getPage } from "./selectors";
import { sharedAsyncThunk } from "store/shared/sharedAsyncThunk";

export const {
    setErrorsAC,
    setLoadedAC,
    setLoadingAC,
    firstLoadingDataAC,
    changeCurrentPageAC,
    resetPageAC,
    updateDataAC,
    changeFormFieldAC,
    setLoadedResidentsAC,
    setResetResidentsAC
} = actionCreators(LABEL.EPISODES);

const asyncThunk = sharedAsyncThunk(LABEL.EPISODES);

export const changeFilterThunk = (fieldName, value) => dispatch => {
    dispatch(changeFormFieldAC(fieldName, value));
    dispatch(resetPageAC());
    dispatch(debounceThunk(loadEpisodes));
};

const _loadEpisodes = () => async (dispatch, getState) => {
    const name = getName(getState());
    const episodes = await getEpisodes({ name });
    dispatch(firstLoadingDataAC(episodes.data.results));
};
export const loadEpisodes = () => async (dispatch, getState) => {
    dispatch(resetPageAC());
    dispatch(asyncThunk(_loadEpisodes));
};
const _loadMoreEpisodes = () => async (dispatch, getState) => {
    const name = getName(getState());
    const page = getPage(getState());
    const episodes = await getEpisodes({ name, page });

    dispatch(updateDataAC(episodes.data.results));
};
export const loadMoreEpisodes = () => async (dispatch, getState) => {
    dispatch(changeCurrentPageAC());
    dispatch(asyncThunk(_loadMoreEpisodes));
};

const _loadEpisode = id => async (dispatch, getState) => {
    dispatch(setResetResidentsAC());
    let episode = getEpisodesById(getState(), id);

    if (!episode) {
        episode = (await getEpisode(id)).data;

        dispatch(firstLoadingDataAC([episode]));
    }

    const characters = episode.characters.map(item => Number(item.split("/").at(-1)));

    const charactersEpisode = await getCharacter(characters);
    dispatch(
        setCharactersAC(Array.isArray(charactersEpisode.data) ? charactersEpisode.data : [charactersEpisode.data])
    );
    dispatch(setLoadedResidentsAC());
};
export const loadEpisode = id => async (dispatch, getState) => {
    dispatch(asyncThunk(_loadEpisode, id));
};
