import {
    CHANGE_CURRENT_PAGE,
    CHANGE_FORM_FIELD,
    ERRORS_CHARACTER,
    LOAD_MORE,
    PAGE_RESET,
    SET_CHARACTERS,
    SET_GENDER,
    SET_LOADED,
    SET_LOADING,
    SET_NAME,
    SET_SPECIES,
    SET_STATUS
} from "./actionTypes";
import { LOADING_STATE } from "./constans";
import { INITIAL_STATE } from "./initialState";

export const characterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CHARACTERS:
            return {
                ...state,
                characters: action.characters
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
        case ERRORS_CHARACTER:
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
                characters: [...state.characters, ...action.characters]
            };
        case SET_NAME:
            return {
                ...state,
                form: { ...state.form, name: action.name }
            };
        case SET_SPECIES:
            return {
                ...state,
                form: { ...state.form, species: action.species }
            };
        case SET_GENDER:
            return {
                ...state,
                form: { ...state.form, gender: action.gender }
            };
        case SET_STATUS:
            return {
                ...state,
                form: { ...state.form, status: action.status }
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
