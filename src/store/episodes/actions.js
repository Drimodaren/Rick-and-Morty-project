import { getEpisodes } from "rickmortyapi";
import { actionCreators } from "store/shared/actionCreators";
import { debounceThunk } from "store/shared/debounceThunk";
import { LABEL } from "store/shared/labels";
import { getName } from "./selectors";

export const {
    setErrorsAC,
    setLoadedAC,
    setLoadingAC,
    firstLoadingDataAC,
    changeCurrentPageAC,
    resetPageAC,
    updateDataAC,
    changeFormFieldAC
} = actionCreators(LABEL.EPISODES);

export const asyncThunk =
    (cb, ...arg) =>
    async (dispatch, getState) => {
        dispatch(setLoadingAC());
        try {
            dispatch(cb(...arg));
        } catch (e) {
            dispatch(setErrorsAC(e.message));
        } finally {
            dispatch(setLoadedAC());
        }
    };

export const changeFilterThunk = (fieldName, value) => dispatch => {
    debugger
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
