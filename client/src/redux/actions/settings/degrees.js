import { DEGREES_CELSIUS, DEGREES_FAHRENHEIT } from "../../types/types"

export const degreesCelsius = () => {
  localStorage.setItem('degrees', 'Celsius')
  return dispatch => {
    dispatch({
      type: DEGREES_CELSIUS,
    })
  }
}

export const degreesFahrenheit = () => {
  localStorage.setItem('degrees', 'Fahrenheit')
  return dispatch => {
    dispatch({
        type: DEGREES_FAHRENHEIT,
    })
  }
}