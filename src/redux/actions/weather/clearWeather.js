import { LOAD_WEATHER } from "../../types/types"

export const clearWeather = () => {
    return async dispatch => {
            const payload = {
                isLoaded: false,
                data: null
            }
            dispatch({
                type: LOAD_WEATHER,
                payload: payload
            })
    }
}