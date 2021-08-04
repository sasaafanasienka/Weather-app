import { useCallback, useEffect } from "react"
import auth from '../store/AuthStore'
import user from '../store/UserStore'

const storageName = 'userData'

export const useAuth = () => {

    const login = useCallback((jwtToken, id) => {
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
        auth.login(jwtToken, id)
        user.loadUserData()
    }, [])

    const logout = useCallback(() => {
        auth.logout()
    }, []) 

    useEffect(() => {
        // localStorage.clear()
        const data = JSON.parse(localStorage.getItem(storageName))
        console.log('useAuth')
        console.log(data)
        if (data && data.token) {
            login(data.token, data.userId)
            auth.token = data.token
            auth.userId = data.userId
            auth.isAuth = true
        }
    }, [login])

    return { login, logout }
}