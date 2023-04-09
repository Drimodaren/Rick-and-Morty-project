import { setupStore } from "../..";
import {
    changeCurrentPageAC,
    loadCharaters,
    loadMoreAc,
    setCharatersAC,
    setErrorsAC,
    setLoadedAC,
    setLoadingAC
} from "../actions";
import { LOADING_STATE } from "../constans";
import { INITIAL_STATE } from "../initialState";
import { characterReducer } from "../reducer";
import { getAllCharacters, getErrors, getLoading, getPage } from "../selectors";

let store;
describe("charactersReducer", () => {
    describe("Action", () => {
        beforeEach(() => {
            store = setupStore();
        });
        it.skip("should load initial characters", () => {
            jest.mock("rickmortyapi", () => {
                return {
                    getCharacters: jest.fn(() => {
                        return {
                            data: {
                                results: [1, 2, 3]
                            }
                        };
                    })
                };
            });
            store.dispatch(loadCharaters());

            expect(getAllCharacters(store.getState())).toHaveLength(0);
        });
    });

    describe("Selector", () => {
        beforeEach(() => {
            store = setupStore();
        });
        it("should return all characters", () => {
            const store = setupStore({
                character: {
                    characters: [1, 2, 3]
                }
            });
            expect(getAllCharacters(store.getState())).toHaveLength(3);
            store.dispatch(loadMoreAc([5, 6, 7]));
            expect(getAllCharacters(store.getState())).toHaveLength(6);
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
            expect(state.characters).toHaveLength(0);
            expect(state.currentPage).toEqual(1);
        });
        it("should set characters", () => {
            const action = setCharatersAC([1, 2, 3, 4]);
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.characters).toHaveLength(4);
            expect(state.characters).toEqual([1, 2, 3, 4]);
            expect(state.characters).toContain(1);
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
            const actionOld = setCharatersAC([1, 2, 3, 4]);
            const stateOld = characterReducer(INITIAL_STATE, actionOld);
            const actionNew = loadMoreAc([5, 6, 7, 8]);
            const stateNew = characterReducer(stateOld, actionNew);
            expect(stateNew.characters).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        });
        it("should set currentPage", () => {
            const action = changeCurrentPageAC(1);
            const state = characterReducer(INITIAL_STATE, action);
            expect(state.currentPage).toEqual(2);
        });
    });
});
