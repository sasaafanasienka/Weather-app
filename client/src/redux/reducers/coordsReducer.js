import { GET_COORDS } from "../types/types"

const initialState = {
    isLoaded: false,
    lat: null,
    long: null,
}

export const coordsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_COORDS:
            return action.payload
        default:
            return state
    }
}