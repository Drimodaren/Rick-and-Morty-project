import { getCharacter, getLocation, getLocations } from "rickmortyapi";
import { All_LOCATIONS_COUNT } from "./actionTypes";
import { getDimension, getLocationById, getName, getPage, getType } from "./selectors";
import { firstLoadingDataAC as setCharactersAC } from "store/characters/actions";
import { actionCreators } from "store/shared/actionCreators";
import { LABEL } from "store/shared/labels";

import { sharedAsyncThunk } from "store/shared/sharedAsyncThunk";

const characterActionCreators = actionCreators(LABEL.LOCATIONS);
export const {
    changeCurrentPageAC,
    changeFormFieldAC,
    firstLoadingDataAC,
    resetPageAC,
    setErrorsAC,
    setLoadedAC,
    setLoadingAC,
    updateDataAC,
    setLoadedResidentsAC,
    setResetResidentsAC
} = characterActionCreators;
const asyncThunk = sharedAsyncThunk(LABEL.LOCATIONS);
export const setAllLocationsCount = count => {
    return {
        type: All_LOCATIONS_COUNT,
        count
    };
};

export const changeFilterThunk = (fieldName, value) => dispatch => {
    dispatch(changeFormFieldAC(fieldName, value));
    dispatch(resetPageAC());
    dispatch(asyncThunk(loadLocations));
};
export const changeSelectThunk = (fieldName, value) => dispatch => {
    dispatch(changeFormFieldAC(fieldName, value));
    dispatch(resetPageAC());
    dispatch(asyncThunk(loadLocations));
};

const _loadLocations = () => async (dispatch, getState) => {
    const page = getPage(getState());
    const name = getName(getState());
    const type = getType(getState());
    const dimension = getDimension(getState());
    const locations = await getLocations({ page, name, type, dimension });
    dispatch(setAllLocationsCount(locations.data.info.count));
    dispatch(firstLoadingDataAC(locations.data.results));
};
export const loadLocations = () => async (dispatch, getState) => {
    dispatch(resetPageAC());
    dispatch(asyncThunk(_loadLocations));
};

const _loadMoreLocations = () => async (dispatch, getState) => {
    const page = getPage(getState());
    const name = getName(getState());
    const type = getType(getState());
    const dimension = getDimension(getState());
    const locations = await getLocations({ page, name, type, dimension });

    dispatch(updateDataAC(locations.data.results));
};

export const loadMoreLocations = () => async (dispatch, getState) => {
    dispatch(changeCurrentPageAC());
    dispatch(asyncThunk(_loadMoreLocations));
};

const _loadLocation = id => async (dispatch, getState) => {
    dispatch(setResetResidentsAC());
    let location = getLocationById(getState(), id);

    if (!location) {
        location = (await getLocation(id)).data;
        dispatch(firstLoadingDataAC([location]));
    }

    const residents = location.residents.map(item => Number(item.split("/").at(-1)));
    const charactersLocation = await getCharacter(residents);
    dispatch(
        setCharactersAC(Array.isArray(charactersLocation.data) ? charactersLocation.data : [charactersLocation.data])
    );
    dispatch(setLoadedResidentsAC());
};
export const loadLocation = id => async (dispatch, getState) => {
    dispatch(asyncThunk(_loadLocation, id));
};
