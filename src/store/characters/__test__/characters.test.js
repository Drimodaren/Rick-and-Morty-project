import { setupStore } from "../..";
import {
    changeCurrentPageAC,
    loadMoreAc,
    loadCharacters,
    setCharactersAC,
    setErrorsAC,
    setLoadedAC,
    setLoadingAC,
    asyncThunk
} from "../actions";
import { LOADING_STATE } from "../../shared/loadingState";
import { INITIAL_STATE } from "../initialState";
import { characterReducer } from "../reducer";
import { getCharactersAllIds, getCharactersById, getErrors, getLoading, getPage } from "../selectors";

import * as rickmortyapi from "rickmortyapi";
jest.mock("rickmortyapi");
let store;

const mockDispatch = jest.fn();

describe("charactersReducer", () => {
    describe("Action", () => {
        beforeEach(() => {
            store = setupStore();
            mockDispatch.mockClear();
        });
        it("should call dispatch three times", async () => {
            const cb = () => dispatch => {};
            const thunk = asyncThunk(cb);
            await thunk(mockDispatch, store.getState);
            expect(mockDispatch).toHaveBeenCalledTimes(3);
            expect(mockDispatch).toHaveBeenCalledWith(setLoadingAC());
            expect(mockDispatch).toHaveBeenCalledWith(setLoadedAC());
        });
        it("should load initial characters", async () => {
            const response = {
                data: {
                    results: [{ id: 1 }, { id: 2 }]
                }
            };
            rickmortyapi.getCharacters.mockImplementation(() => Promise.resolve(response));
            await store.dispatch(loadCharacters());

            expect(getCharactersAllIds(store.getState())).toHaveLength(2);
        });
    });

    describe("Selector", () => {
        beforeEach(() => {
            store = setupStore();
        });
        it("should return all characters", () => {
            const store = setupStore({
                character: {
                    characters: { byId: { 1: { id: 1 }, 2: { id: 2 } }, allIds: [1, 2] }
                }
            });
            expect(getCharactersById(store.getState())).toEqual({ 1: { id: 1 }, 2: { id: 2 } });
            expect(getCharactersAllIds(store.getState())).toHaveLength(2);
            store.dispatch(loadMoreAc([{ id: 3 }, { id: 4 }]));
            expect(getCharactersById(store.getState())).toEqual({
                1: { id: 1 },
                2: { id: 2 },
                3: { id: 3 },
                4: { id: 4 }
            });
            expect(getCharactersAllIds(store.getState())).toHaveLength(4);
        });
        it("should return loading", () => {
            const store = setupStore({
                character: {
                    loading: LOADING_STATE.NEVER
                }
            });
            expect(getLoading(store.getState())).toBe("Never");
            store.dispatch(setLoadingAC());
            expect(getLoading(store.getState())).toBe("Loading");
            store.dispatch(setLoadedAC());
            expect(getLoading(store.getState())).toBe("Loaded");
        });
        it("should return errors", () => {
            const store = setupStore({
                character: {
                    errors: "Olo-lo"
                }
            });
            expect(getErrors(store.getState())).toBe("Olo-lo");
            store.dispatch(setErrorsAC("You're loser Morty"));
            expect(getErrors(store.getState())).toBe("You're loser Morty");
        });
        it("should return page", () => {
            const store = setupStore({
                character: {
                    currentPage: 1
                }
            });
            expect(getPage(store.getState())).toEqual(1);
            store.dispatch(changeCurrentPageAC(2));
            expect(getPage(store.getState())).toEqual(2);
        });
    });
    describe("Reducer", () => {
        it("should return initialState", () => {
            const state = characterReducer(undefined, {});
            expect(state).toEqual(INITIAL_STATE);
            expect(state.loading).toBe(LOADING_STATE.NEVER);
            expect(state.errors).toBe("");
            expect(state.characters.allIds).toHaveLength(0);
            expect(state.currentPage).toEqual(1);
        });
        it("should set characters", () => {
            const action = setCharactersAC([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.characters.allIds).toHaveLength(4);
            expect(state.characters.allIds).toEqual([1, 2, 3, 4]);
            expect(state.characters.allIds).toContain(1);
            expect(state.characters.byId).toEqual({ 1: { id: 1 }, 2: { id: 2 }, 3: { id: 3 }, 4: { id: 4 } });
        });
        it("should set loading", () => {
            const action = setLoadingAC();
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.loading).toBe(LOADING_STATE.LOADING);
        });
        it("should set loaded", () => {
            const action = setLoadedAC();
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.loading).toBe(LOADING_STATE.LOADED);
        });
        it("should set error", () => {
            const action = setErrorsAC("хуйня");
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.errors).toBe("хуйня");
        });
        it("should load more characters", () => {
            const actionOld = setCharactersAC([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
            const stateOld = characterReducer(INITIAL_STATE, actionOld);
            const actionNew = loadMoreAc([{ id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]);
            const stateNew = characterReducer(stateOld, actionNew);
            expect(stateNew.characters.allIds).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(stateNew.characters.byId).toEqual({
                1: { id: 1 },
                2: { id: 2 },
                3: { id: 3 },
                4: { id: 4 },
                5: { id: 5 },
                6: { id: 6 },
                7: { id: 7 },
                8: { id: 8 }
            });
        });
        it("should set currentPage", () => {
            const action = changeCurrentPageAC(1);
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.currentPage).toEqual(2);
        });
    });
});
