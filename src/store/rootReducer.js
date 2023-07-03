import { combineReducers } from "@reduxjs/toolkit";
import { characterReducer } from "./characters/reducer";
import { locationsReducer } from "./locations/reducer";
import { reducer as CharacterRed } from "store/characters/slice";

export const rootReducer = combineReducers({
    characters: CharacterRed,
    locations: locationsReducer
});
