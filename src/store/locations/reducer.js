import { getActionsTypesByLabel } from "store/shared/sharedActionTypes";
import { All_LOCATIONS_COUNT, SET_LOADED_RESIDENTS, SET_RESET_RESIDENTS } from "./actionTypes";
import { LOADING_STATE } from "../shared/loadingState";
import { INITIAL_STATE } from "./initialState";
import { LABEL } from "store/shared/labels";
import { sharedReducer } from "store/shared/sharedReducer";

export const locationsReducer = (state = INITIAL_STATE, action) => {
    if (getActionsTypesByLabel(LABEL.LOCATIONS).includes(action.type)) {
        return sharedReducer(state, action, LABEL.LOCATIONS);
    }
    switch (action.type) {
        case SET_LOADED_RESIDENTS:
            return {
                ...state,
                loadingResedents: LOADING_STATE.LOADED
            };
        case SET_RESET_RESIDENTS:
            return {
                ...state,
                loadingResedents: LOADING_STATE.NEVER
            };

        case All_LOCATIONS_COUNT:
            return {
                ...state,
                allLocationsCount: action.count
            };
        default:
            return state;
    }
};
