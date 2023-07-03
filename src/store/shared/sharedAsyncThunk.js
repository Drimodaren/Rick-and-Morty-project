import { setErrors, setLoaded, setLoading } from "./sharedActionTypes";

export const sharedAsyncThunk =
    label =>
    (cb, ...args) =>
    async (dispatch, getState) => {
        dispatch({ type: setLoading(label)});
        try {
            await dispatch(cb(...args));
        } catch (e) {
            dispatch({ type: setErrors(label, e.message) });
        } finally {
            dispatch({ type: setLoaded(label) });
        }
    };
