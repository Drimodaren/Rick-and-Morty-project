import { LOADING_STATE } from "./constans";

export const INITIAL_STATE = {
    locations: { byId: {}, allIds: [] },
    loading: LOADING_STATE.NEVER,
    loadingResedents: LOADING_STATE.NEVER,
    errors: "",
    currentPage: 1,
    form: {
        name: "",
        type: "",
        Dimension: ""
    }
};
