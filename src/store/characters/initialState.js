import { INITIAL_STATE as sharedInitialState } from "../shared/initialState";

export const INITIAL_STATE = {
    ...sharedInitialState,
    form: {
        name: "",
        species: "",
        gender: "",
        status: ""
    }
};
