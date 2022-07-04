import { DEGREES_CELSIUS, DEGREES_FAHRENHEIT, SPEED_MS, SPEED_KMH, PRESSURE_MMHG, PRESSURE_HPA, PRESSURE_ATMO } from "../types/types"

const initialState = {
  degrees: localStorage.getItem('degrees') ? localStorage.getItem('degrees') : 'Celsius',
  windspeed: localStorage.getItem('windspeed') ? localStorage.getItem('windspeed') : 'm/s',
  pressure: localStorage.getItem('pressure') ? localStorage.getItem('pressure'): 'hPa'
}

export const settingsReducer = (state = initialState, action) => {
    switch(action.type) {
      case DEGREES_CELSIUS:
          return {...state, degrees: 'Celsius'}
      case DEGREES_FAHRENHEIT:
        return { ...state, degrees: 'Fahrenheit' }
      case SPEED_MS: 
        return { ...state, windspeed: 'm/s'}
      case SPEED_KMH: 
        return { ...state, windspeed: 'km/h'}
      case PRESSURE_HPA: 
        return { ...state, pressure: 'hPa'}
      case PRESSURE_MMHG: 
        return { ...state, pressure: 'mmHg'}
      case PRESSURE_ATMO: 
        return { ...state, pressure: 'atm.'}
      default:
        return state
    }
}