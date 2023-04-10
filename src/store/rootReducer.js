import { combineReducers } from "@reduxjs/toolkit";
import { characterReducer } from "./characters/reducer";

export const rootReducer = combineReducers({
    character: characterReducer
});
