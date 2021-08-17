import { LOAD_WEATHER } from "../../types/types"

export const loadWeather = (URL) => {
    return async dispatch => {
        try {
            const response = await fetch(URL)
            const data = await response.json()
            console.log(data)
            const payload = {
                isLoaded: true,
                data: data
            }
            if (response.ok) {
                dispatch({
                    type: LOAD_WEATHER,
                    payload: payload
                })
            } else {
                throw Error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
}