import { LABEL } from "store/shared/labels";

import { INITIAL_STATE } from "./initialState";
import { getActionsTypesByLabel } from "store/shared/sharedActionTypes";
import { sharedReducer } from "store/shared/sharedReducer";
import { SET_LOADED_EPISODES, SET_RESET_EPISODES } from "./actionTypes";
import { LOADING_STATE } from "store/shared/loadingState";

export const characterReducer = (state = INITIAL_STATE, action) => {
    if (getActionsTypesByLabel(LABEL.CHARACTERS).includes(action.type)) {
        return sharedReducer(state, action, LABEL.CHARACTERS);
    }
    switch (action.type) {
        case SET_LOADED_EPISODES:
            return {
                ...state,
                loadingEpisodes: LOADING_STATE.LOADED
            };
        case SET_RESET_EPISODES:
            return {
                ...state,
                loadingEpisodes: LOADING_STATE.NEVER
            };

        default:
            return state;
    }
};
