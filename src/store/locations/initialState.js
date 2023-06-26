import { LOADING_STATE } from "../shared/loadingState";
import { INITIAL_STATE as sharedInitialState } from "../shared/initialState";

export const INITIAL_STATE = {
    ...sharedInitialState,
    loadingResedents: LOADING_STATE.NEVER,
    allLocationsCount: 0,
    form: {
        name: "",
        type: "",
        Dimension: ""
    }
};
