//actionTypes
export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const MULTIPLAY = "counter/MULTIPLAY";

//reducer
export const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT: {
            return state + 1;
        }
        case DECREMENT: {
            return state - 1;
        }
        case MULTIPLAY: {
            return state * action.mult;
        }
        default:
            return state;
    }
};


//actionCreator
export const incrementAC = () => {
    return {
        type: INCREMENT
    };
};
export const decrementAC = () => {
    return {
        type: DECREMENT
    };
};
export const multiplayAC = (mult = 0) => {
    return {
        type: MULTIPLAY,
        mult
    };
};

//action
export const customThunk = (num, mult) => dispatch => {
    for (let i = 0; i < num; i++) {
        dispatch(incrementAC());
    }
    dispatch(multiplayAC(mult));
};
