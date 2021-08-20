import { deleteCookie } from "../../../utilits/cookies"
import { LOGOUT } from "../../types/types"

export const logout = (alert) => {
    return dispatch => {
        deleteCookie('token')
        deleteCookie('userName')
        deleteCookie('favs')
        const payload = {
            isAuth: false,
            token: null,
            userName: null,
            favs: []
        }
        dispatch({
            type: LOGOUT,
            payload: payload
        })
        alert.show('You are logged out')
    }
}