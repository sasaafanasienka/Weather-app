import { LOGIN, LOGOUT, LOCALLOGIN, REGISTER, ADDFAV, REMOVEFAV } from "../types/types"

const initialState = {
    isAuth: false,
    token: null,
    userName: null,
    favs: []
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER:
            return action.payload
        case LOGIN:
            return action.payload
        case LOGOUT:
            return action.payload
        case LOCALLOGIN:
            return action.payload
        case ADDFAV:
            return {...state, favs: action.payload}
        case REMOVEFAV:
            return {...state, favs: action.payload}
        default:
            return state
    }
}