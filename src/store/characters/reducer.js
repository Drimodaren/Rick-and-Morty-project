import { LABEL } from "store/shared/labels";

import { INITIAL_STATE } from "./initialState";
import { getActionsTypesByLabel } from "store/shared/sharedActionTypes";
import { sharedReducer } from "store/shared/sharedReducer";

export const characterReducer = (state = INITIAL_STATE, action) => {
    if (getActionsTypesByLabel(LABEL.CHARACTERS).includes(action.type)) {
        return sharedReducer(state, action, LABEL.CHARACTERS);
    }

    switch (action.type) {
        default:
            return state;
    }
};
