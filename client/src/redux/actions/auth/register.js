import { setCookie } from "../../../utilits/cookies"
import { REGISTER } from "../../types/types"

export const register = (form, alert) => {
    return async dispatch => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
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
                    type: REGISTER,
                    payload: payload
                })
                setCookie('token', data.token)
                setCookie('userName', data.userName)
                setCookie('favs', data.favs.join())
                alert.show(data.message, {type: 'success'})
            } else {
                throw Error(data.message)
            }
        } catch (error) {
            alert.show(error.message, {type: 'error'})
        }
    }
}