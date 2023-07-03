import { getActionsTypesByLabel, getActionsTypesByLabelResidents } from "store/shared/sharedActionTypes";
import { INITIAL_STATE } from "./initialState";
import { LABEL } from "store/shared/labels";
import { sharedReducer } from "store/shared/sharedReducer";
import { sharedResidentsReducer } from "store/shared/sharedResidentsReducer";


export const episodesReducer = (state = INITIAL_STATE, action) => {
    if (getActionsTypesByLabel(LABEL.EPISODES).includes(action.type)) {
        return sharedReducer(state, action, LABEL.EPISODES);
    }
    if (getActionsTypesByLabelResidents(LABEL.EPISODES).includes(action.type)) {
        return sharedResidentsReducer(state, action, LABEL.EPISODES);
    }
    switch (action.type) {
        default:
            return state;
    }
};
