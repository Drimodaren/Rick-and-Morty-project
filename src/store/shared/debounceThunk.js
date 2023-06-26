export const debounceThunk =
    (cb, ...arg) =>
    dispatch => {
        let flag = null;
        if (!flag) {
            flag = setTimeout(() => {
                dispatch(cb(...arg));
            }, 1500);
        } else {
            clearTimeout(flag);
        }
    };