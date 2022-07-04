import { PRESSURE_ATMO, PRESSURE_HPA, PRESSURE_MMHG } from "../../types/types"

export const pressureHPA = () => {
  localStorage.setItem('pressure', 'HPa')
  return dispatch => {
    dispatch({
      type: PRESSURE_HPA,
    })
  }
}

export const pressureMMHG = () => {
  localStorage.setItem('pressure', 'mmHg')
  return dispatch => {
    dispatch({
      type: PRESSURE_MMHG
    })
  }
}

export const pressureATMO = () => {
  localStorage.setItem('pressure', 'atm.')
  return dispatch => {
    dispatch({
      type: PRESSURE_ATMO
    })
  }
}