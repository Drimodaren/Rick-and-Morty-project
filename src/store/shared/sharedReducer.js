import { INITIAL_STATE } from "./initialState";
import { LOADING_STATE } from "./loadingState";
import {
    changeCurrentPage,
    changeFormField,
    firstLoadingData,
    resetPage,
    setErrors,
    setLoaded,
    setLoadedResidents,
    setLoading,
    setResetResidents,
    updateData
} from "./sharedActionTypes";

export const sharedReducer = (state, action, label) => {
    switch (action.type) {
        case firstLoadingData(label):
            return {
                ...state,
                entities: { byId: action.byId, allIds: action.allIds }
            };
        case updateData(label):
            return {
                ...state,
                entities: {
                    byId: { ...state.entities.byId, ...action.byId },
                    allIds: Array.from(new Set([...state.entities.allIds, ...action.allIds]))
                }
            };
        case setLoading(label): {
            return { ...state, loading: LOADING_STATE.LOADING };
        }
        case setLoaded(label): {
            return { ...state, loading: LOADING_STATE.LOADED };
        }
        case setErrors(label): {
            return { ...state, errors: action.message };
        }
        case changeCurrentPage(label): {
            return { ...state, currentPage: state.currentPage + 1 };
        }
        case resetPage(label): {
            return { ...state, currentPage: INITIAL_STATE.currentPage };
        }
        case changeFormField(label):
            return {
                ...state,
                form: { ...state.form, [action.fieldName]: action.value }
            };
            case setLoadedResidents(label):
                return {
                    ...state,
                    loadingResedents: LOADING_STATE.LOADED
                };
            case setResetResidents(label):
                return {
                    ...state,
                    loadingResedents: LOADING_STATE.NEVER
                };
    

        default:
            return state;
    }
};
