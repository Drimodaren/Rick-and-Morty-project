import { getActionsTypesByLabel } from "store/shared/sharedActionTypes";
import { INITIAL_STATE } from "./initialState";
import { LABEL } from "store/shared/labels";
import { sharedReducer } from "store/shared/sharedReducer";

export const episodesReducer = (state = INITIAL_STATE, action) => {
    if (getActionsTypesByLabel(LABEL.EPISODES).includes(action.type)) {
        return sharedReducer(state, action, LABEL.EPISODES);
    }
    switch (action.type) {
     
      default:
        return state;
    }
};
