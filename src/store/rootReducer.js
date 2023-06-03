import { combineReducers } from "@reduxjs/toolkit";
import { characterReducer } from "./Characters/reducer";

export const rootReducer = combineReducers({
    character: characterReducer
});
