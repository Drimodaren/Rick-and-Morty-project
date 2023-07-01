import { getActionsTypesByLabel } from "store/shared/sharedActionTypes";
import { INITIAL_STATE } from "./initialState";
import { LABEL } from "store/shared/labels";
import { sharedReducer } from "store/shared/sharedReducer";
import { SET_LOADED_RESIDENTS, SET_RESET_RESIDENTS } from "./actionTypes";
import { LOADING_STATE } from "store/shared/loadingState";

export const episodesReducer = (state = INITIAL_STATE, action) => {
    if (getActionsTypesByLabel(LABEL.EPISODES).includes(action.type)) {
        return sharedReducer(state, action, LABEL.EPISODES);
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

     
      default:
        return state;
    }
};
