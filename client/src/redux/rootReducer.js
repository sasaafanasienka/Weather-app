import { combineReducers } from "redux";
import { coordsReducer } from "./reducers/coordsReducer";
import { weatherReducer } from "./reducers/weatherReducer";
import { windowReducer } from "./reducers/windowReducer";

export const rootReducer = combineReducers({
    coords: coordsReducer,
    weather: weatherReducer,
    window: windowReducer
})