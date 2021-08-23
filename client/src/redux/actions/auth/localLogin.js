import { LOGIN } from "../../types/types"

export const localLogin = (token, userName, favs, alert) => {
    return dispatch => {
        const payload = {
            isAuth: true,
            token: token,
            userName: userName,
            favs: favs.split(',')
        }
        dispatch({
            type: LOGIN,
            payload: payload
        })
        alert.show('You are logged in', {type: 'success'})
    }
}