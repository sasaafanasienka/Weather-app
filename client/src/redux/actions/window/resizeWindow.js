import { RESIZE_WINDOW } from "../../types/types"

export const resizeWindow = (width) => {
    return dispatch => {
        const payload = {
            width: width,
        }
        dispatch({
            type: RESIZE_WINDOW,
            payload: payload
        })
    }
}