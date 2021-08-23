import { setCookie } from "../../../utilits/cookies"
import { ADDFAV } from "../../types/types"
import { baseRequestURL } from "../../../variables/baseRequestURL"

export const removeFav = (login, id, alert) => {
    return async dispatch => {
        try {
            const response = await fetch(`${baseRequestURL}/api/auth/removefav`, {
                method: 'PUT',
                body: JSON.stringify({
                    login: login, id: id.toString()
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            const payload = data.favs
            if (response.ok) {
                dispatch({
                    type: ADDFAV,
                    payload: payload
                })
                setCookie('favs', data.favs.join())
                alert.show(data.message, { type: 'success' })
            } else {
                throw Error(data.message)
            }
        } catch (error) {
            alert.show(error.message, { type: 'error' })
        }
    }
}