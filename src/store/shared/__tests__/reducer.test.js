import { sharedReducer } from "store/shared/sharedReducer";
import { INITIAL_STATE } from "store/shared/initialState";
import { actionCreators } from "store/shared/actionCreators";
import { LOADING_STATE } from "store/shared/loadingState";

const label = "testEntity";
const {
    changeCurrentPageAC,
    changeFormFieldAC,
    firstLoadingDataAC,
    resetPageAC,
    setLoadedAC,
    setLoadingAC,
    setErrorsAC,
    updateDataAC
} = actionCreators(label);
const labelReducer = (state, action) => {
    return sharedReducer(state, action, label);
};
describe("shared reducer test", () => {
    it("should return initial state", () => {
        const state = labelReducer(undefined, {});
        expect(state).toEqual(INITIAL_STATE);
    });
    it("should return patched initial state", () => {
        const state = labelReducer({ ...INITIAL_STATE, form: { someField: "" } }, {});
        expect(state).toEqual({ ...INITIAL_STATE, form: { someField: "" } });
    });
    it("should set label entities first load", () => {
        const action = firstLoadingDataAC([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
        const state = labelReducer(INITIAL_STATE, action);
        expect(state.entities.allIds).toHaveLength(4);
        expect(state.entities.allIds).toEqual([1, 2, 3, 4]);
        expect(state.entities.allIds).toContain(1);
        expect(state.entities.byId).toEqual({ 1: { id: 1 }, 2: { id: 2 }, 3: { id: 3 }, 4: { id: 4 } });
    });
    it("should set loading", () => {
        const action = setLoadingAC();
        const state = labelReducer(INITIAL_STATE, action);
        expect(state.loading).toBe(LOADING_STATE.LOADING);
    });
    it("should set loaded", () => {
        const action = setLoadedAC();
        const state = labelReducer(INITIAL_STATE, action);
        expect(state.loading).toBe(LOADING_STATE.LOADED);
    });
    it("should set error", () => {
        const action = setErrorsAC("хуйня");
        const state = labelReducer(INITIAL_STATE, action);
        expect(state.errors).toBe("хуйня");
    });
    it("should load more characters", () => {
        const actionOld = firstLoadingDataAC([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
        const stateOld = labelReducer(INITIAL_STATE, actionOld);
        const actionNew = updateDataAC([{ id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]);
        const stateNew = labelReducer(stateOld, actionNew);
        expect(stateNew.entities.allIds).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        expect(stateNew.entities.byId).toEqual({
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
        const state = labelReducer(INITIAL_STATE, action);
        expect(state.currentPage).toEqual(2);
    });
    it("should set change form field", () => {
        const action = changeFormFieldAC("labelField", "labelValue");
        const state = labelReducer({ ...INITIAL_STATE, form: { labelField: "" } }, action);
        expect(state.form.labelField).toEqual("labelValue");
    });
    it("should reset page", () => {
        const action = resetPageAC();
        const state = labelReducer({ ...INITIAL_STATE, currentPage: 50 }, action);
        expect(state.currentPage).toEqual(1);
    });
});
