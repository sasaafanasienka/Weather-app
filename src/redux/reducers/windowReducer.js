import { RESIZE_WINDOW } from "../types/types"

const initialState = {
    width: window.innerWidth,
}

export const windowReducer = (state = initialState, action) => {
    switch(action.type) {
        case RESIZE_WINDOW:
            return action.payload
        default:
            return state
    }
}