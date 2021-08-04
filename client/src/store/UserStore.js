import { body } from "express-validator"
import { makeAutoObservable } from "mobx"
import auth from '../store/AuthStore'

class UserStore {

    email = ''
    name = ''
    surname = ''

    constructor() {
        makeAutoObservable(this)
        this.get = this.get.bind(this)
        this.loadUserData = this.loadUserData.bind(this)
    }

    moveDataToStore(data) {
        this.email = data.email
        this.name = data.name
        this.surname = data.surname
    }
    
    async get(URL) {
        try {
            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                } 
            })
            const data = await response.json()
            this.isLoaded = true
            this.moveDataToStore(data[0])
        } catch (err) {
            this.error = err
        } finally {
            this.isLoaded = true
        }
    }

    async loadUserData() {
        const URL = 'api/user/getdata'
        this.get(URL)
    }

    deleteUserData() {
        this.email = ''
        this.name = ''
        this.surname = ''
    }
    
}

export default new UserStore()