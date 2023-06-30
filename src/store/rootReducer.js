import { combineReducers } from "@reduxjs/toolkit";
import { characterReducer } from "./characters/reducer";
import { locationsReducer } from "./locations/reducer";
import { episodesReducer } from "./episodes/reducer";

export const rootReducer = combineReducers({
    characters: characterReducer,
    locations: locationsReducer,
    episodes: episodesReducer
});
