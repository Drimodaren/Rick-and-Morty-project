import {
    CHANGE_CURRENT_PAGE,
    CHANGE_FORM_FIELD,
    ERRORS_LOCATIONS,
    LOAD_MORE,
    PAGE_RESET,
    SET_LOADED,
    SET_LOADED_RESIDENTS,
    SET_LOADING,
    SET_LOCATIONS,
    SET_RESET_RESIDENTS
} from "./actionTypes";
import { LOADING_STATE } from "./constans";
import { INITIAL_STATE } from "./initialState";

export const locationsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOCATIONS:
            return {
                ...state,
                locations: { byId: action.byId, allIds: action.allIds }
            };
        case SET_LOADING:
            return {
                ...state,
                loading: LOADING_STATE.LOADING
            };
        case SET_LOADED:
            return {
                ...state,
                loading: LOADING_STATE.LOADED
            };
        case SET_LOADED_RESIDENTS:
            return {
                ...state,
                loadingResedents: LOADING_STATE.LOADED
            };
        case SET_RESET_RESIDENTS:
            return {
                ...state,
                loadingResedents: LOADING_STATE.NEVER
            };
        case ERRORS_LOCATIONS:
            return {
                ...state,
                errors: action.message
            };
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage + 1
            };
        case PAGE_RESET:
            return {
                ...state,
                currentPage: INITIAL_STATE.currentPage
            };
        case LOAD_MORE:
            return {
                ...state,
                locations: {
                    byId: { ...state.locations.byId, ...action.byId },
                    allIds: [...state.locations.allIds, ...action.allIds]
                }
            };
        case CHANGE_FORM_FIELD:
            return {
                ...state,
                form: { ...state.form, [action.fieldName]: action.value }
            };
        default:
            return state;
    }
};
