import { setCookie } from "../../../utilits/cookies"
import { LOGIN } from "../../types/types"
import { baseRequestURL } from "../../../variables/baseRequestURL"

export const login = (form, alert) => {

    return async dispatch => {
        try {
            const response = await fetch(`${baseRequestURL}/api/auth/login`, {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Access-Control-Allow-Origin': 'no-cors',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            const payload = {
                isAuth: true,
                token: data.token,
                userName: data.userName,
                favs: data.favs
            }
            if (response.ok) {
                dispatch({
                    type: LOGIN,
                    payload: payload
                })
                setCookie('token', data.token)
                setCookie('userName', data.userName)
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