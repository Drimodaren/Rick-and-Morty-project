import { INITIAL_STATE as sharedInitialState } from "store/shared/initialState";

export const INITIAL_STATE = {
    ...sharedInitialState,
    form: {
        name: ""
    }
};
