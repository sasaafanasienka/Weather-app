import { setCookie } from "../../../utilits/cookies"
import { ADDFAV } from "../../types/types"

export const addFav = (login, id, alert) => {
    return async dispatch => {
        try {
            const response = await fetch('/api/auth/addfav', {
                method: 'PUT',
                body: JSON.stringify({
                    login: login, id: id.toString()
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log(data)
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