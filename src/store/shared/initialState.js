import { LOADING_STATE } from "./loadingState";

export const INITIAL_STATE = {
    entities: { byId: {}, allIds: [] },
    loading: LOADING_STATE.NEVER,
    errors: "",
    currentPage: 1,
    form: {}
};
