import { getActionsTypesByLabel, getActionsTypesByLabelResidents } from "store/shared/sharedActionTypes";
import { All_LOCATIONS_COUNT } from "./actionTypes";
import { INITIAL_STATE } from "./initialState";
import { LABEL } from "store/shared/labels";
import { sharedReducer } from "store/shared/sharedReducer";
import { sharedResidentsReducer } from "store/shared/sharedResidentsReducer";

export const locationsReducer = (state = INITIAL_STATE, action) => {
    if (getActionsTypesByLabel(LABEL.LOCATIONS).includes(action.type)) {
        return sharedReducer(state, action, LABEL.LOCATIONS);
    }
    if (getActionsTypesByLabelResidents(LABEL.LOCATIONS).includes(action.type)) {
        return sharedResidentsReducer(state, action, LABEL.LOCATIONS);
    }
    switch (action.type) {
        case All_LOCATIONS_COUNT:
            return {
                ...state,
                allLocationsCount: action.count
            };
        default:
            return state;
    }
};
