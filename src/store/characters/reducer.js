import { CHANGE_CURRENT_PAGE, ERRORS_CHARACTER, LOAD_MORE, SET_CHARACTER, SET_LOADED, SET_LOADING } from "./actionTypes";
import { LOADING_STATE } from "./constans";
import { INITIAL_STATE } from "./initialState";

export const characterReducer = (state = INITIAL_STATE, action) => {
  
    switch (action.type) {
        case SET_CHARACTER:
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
        case LOAD_MORE:
            return {
                ...state,
                characters: [...state.characters, ...action.characters]
            };
        default:
            return state;
    }
};
