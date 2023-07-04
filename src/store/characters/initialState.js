import { LOADING_STATE } from "store/shared/loadingState";
import { INITIAL_STATE as sharedInitialState } from "../shared/initialState";

export const INITIAL_STATE = {
    ...sharedInitialState,
    loadingEpisodes: LOADING_STATE.NEVER,
    form: {
        name: "",
        species: "",
        gender: "",
        status: ""
    }
};
