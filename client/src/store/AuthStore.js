import { makeAutoObservable } from "mobx"
import { getCookie, setCookie, deleteCookie } from "../utilits/cookies"
import user from './UserStore'
import favs from './FavsStore'

class AuthStore {

    token = null
    userId = null
    isAuth = false

    async login(form) {
        console.log(form)
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            const data = await response.json()
            if (response.ok && data.token && data.userId) {
                this.token = data.token
                this.userId = data.userId
                this.isAuth = true
                setCookie('token', data.token)
                setCookie('userId', data.userId)
                user.loadUserData()
                favs.loadFavsList()
            } else {
                throw Error(data.message)
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    logout() {
        this.token = null
        this.userId = null
        this.isAuth = false
        deleteCookie('token') 
        deleteCookie('userId')
        user.deleteUserData() 
    }

    localLogin() {
        const token = getCookie('token') 
        const userId = getCookie('userId') 
        if (token && userId) {
            this.token = token
            this.userId = userId
            this.isAuth = true
            user.loadUserData()
            favs.loadFavsList()
        }
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new AuthStore()