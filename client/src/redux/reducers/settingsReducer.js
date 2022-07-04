import { DEGREES_CELSIUS, DEGREES_FAHRENHEIT } from "../types/types"

const initialState = {
  degrees: localStorage.getItem('degrees') ? localStorage.getItem('degrees') : 'Celsius',
}

export const settingsReducer = (state = initialState, action) => {
    switch(action.type) {
      case DEGREES_CELSIUS:
            return {...state, degrees: 'Celsius'}
        case DEGREES_FAHRENHEIT:
            return {...state, degrees: 'Fahrenheit'}
        default:
            return state
    }
}