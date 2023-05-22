import { LOADING_STATE } from "./constans";

export const INITIAL_STATE = {
    characters: [],
    loading: LOADING_STATE.NEVER,
    errors: "",
    currentPage:1,
    form: {
        name: "",
        species: "",
        gender: "",
        status: ""
    },
    speciec:[]
};
