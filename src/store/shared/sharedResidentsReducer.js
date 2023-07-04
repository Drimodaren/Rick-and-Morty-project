import { LOADING_STATE } from "./loadingState";
import { setLoadedResidents, setResetResidents } from "./sharedActionTypes";

export const sharedResidentsReducer = (state, action, label) => {
    switch (action.type) {
        case setLoadedResidents(label):
            return {
                ...state,
                loadingResedents: LOADING_STATE.LOADED
            };
        case setResetResidents(label):
            return {
                ...state,
                loadingResedents: LOADING_STATE.NEVER
            };

        default:
            return state;
    }
};
