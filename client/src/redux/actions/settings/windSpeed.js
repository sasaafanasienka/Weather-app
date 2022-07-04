import { SPEED_MS, SPEED_KMH } from "../../types/types"

export const speedMS = () => {
  localStorage.setItem('windspped', 'm/s')
  return dispatch => {
    dispatch({
      type: SPEED_MS,
    })
  }
}

export const speedKMH = () => {
  localStorage.setItem('windspeed', 'km/h')
  return dispatch => {
    dispatch({
        type: SPEED_KMH,
    })
  }
}