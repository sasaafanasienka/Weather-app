import { LOAD_WEATHER, CLEAR_WEATHER } from "../types/types"

const initialState = {
    data: null,
    isLoaded: false,
}

export const weatherReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_WEATHER:
            return action.payload
        case CLEAR_WEATHER:
            return action.payload
        default:
            return state
    }
}