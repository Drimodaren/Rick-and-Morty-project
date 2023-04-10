import { counterReducer, customThunk, decrementAC, incrementAC, multiplayAC } from "../reducer";

const mockDispatch = jest.fn();

describe("counterReducer", () => {
    describe("Action", () => {
        beforeEach(() => {
            mockDispatch.mockClear();
        });
        it("custom thunk", () => {
            const thunk = customThunk(4, 5);
            mockDispatch(thunk);
            expect(mockDispatch).toBeCalledTimes(1);
            expect(mockDispatch).toHaveBeenCalledWith(thunk)
        });
    });
    describe("Selector", () => {});
    describe("Reducer", () => {
        it("should return initialState", () => {
            const state = counterReducer(undefined, {});
            expect(state).toBe(0);
        });
        it("should return increment value", () => {
            const initialState = counterReducer(undefined, {});
            const action = incrementAC();
            const state = counterReducer(initialState, action);
            expect(state).toBe(1);
        });
        it("should return increment value twice", () => {
            const initialState = counterReducer(undefined, {});
            const action = incrementAC();
            const state1 = counterReducer(initialState, action);
            const state = counterReducer(state1, action);
            expect(state).toBe(2);
        });
        it("should return decrement value", () => {
            const initialState = counterReducer(undefined, {});
            const action = decrementAC();
            const state = counterReducer(initialState, action);
            expect(state).toBe(-1);
        });
        it("should return multiplay value", () => {
            const initialState = counterReducer(undefined, {});
            const action = multiplayAC();
            const state = counterReducer(initialState, action);
            expect(state).toBe(0);
        });
        it("should return multiplay value not zero", () => {
            const initialState = counterReducer(5, {});
            const action = multiplayAC(5);
            const state = counterReducer(initialState, action);
            expect(state).toBe(25);
        });
    });
});
