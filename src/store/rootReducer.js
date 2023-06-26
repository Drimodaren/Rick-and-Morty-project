import { combineReducers } from "@reduxjs/toolkit";
import { characterReducer } from "./characters/reducer";
import { locationsReducer } from "./locations/reducer";

export const rootReducer = combineReducers({
    characters: characterReducer,
    locations: locationsReducer
});
