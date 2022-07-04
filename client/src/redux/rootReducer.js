import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { coordsReducer } from "./reducers/coordsReducer";
import { settingsReducer } from "./reducers/settingsReducer";
import { weatherReducer } from "./reducers/weatherReducer";
import { windowReducer } from "./reducers/windowReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    coords: coordsReducer,
    weather: weatherReducer,
    window: windowReducer,
    settings: settingsReducer
})