import { GET_COORDS } from "../../types/types"

export const getCoords = () => {
    return dispatch => {
        const getGolocation = position => {
            const payload = {
                isLoaded: true,
                lat: position.coords.latitude.toFixed(6),
                lon: position.coords.longitude.toFixed(6)
            }
            dispatch({
                type: GET_COORDS,
                payload: payload
            })
        }
        navigator.geolocation.getCurrentPosition(getGolocation)
    }
}