import { INITIAL_STATE as sharedInitialState } from "store/shared/initialState";
import { LOADING_STATE } from "store/shared/loadingState";

export const INITIAL_STATE = {
    ...sharedInitialState,
    loadingResedents: LOADING_STATE.NEVER,
    form: {
        name: ""
    }
};
