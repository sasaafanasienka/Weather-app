import { get, makeAutoObservable, toJS } from "mobx"
import getRequestUrl from "../utilits/getRequestUrl"
import getTimeInterval from "../utilits/getTimeInterval.ts"
import tempConvert from "../utilits/tempConvert"
import auth from './AuthStore'

class FavsStore {

    favsList = []
    numberOfFavs = 0
    weatherData = {}

    constructor() {
        makeAutoObservable(this)
        // this.loadFavsList = this.loadFavsList.bind(this)
    }

    async loadFavsList() {
        try {
            const response = await fetch('/api/favs', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                this.favsList = data.map(el => el.cityId)
                this.numberOfFavs = data.length
            } else {
                throw Error(data.message)
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    async addFav(id) {
        try {
            const response = await fetch('/api/favs/addfav', {
                method: 'POST',
                body: JSON.stringify({id: id}),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                this.loadFavsList()
            } else {
                throw Error(data.message)
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    async removeFav(id) {
        try {
            const response = await fetch('/api/favs/removefav', {
                method: 'DELETE',
                body: JSON.stringify({id: id}),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${auth.token}`
                }
            })
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                this.loadFavsList()
            } else {
                throw Error(data.message)
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    async loadWeatherData(id) {
        const URL = await getRequestUrl(id, 'id')
        try {
            const response = await fetch(URL)
            const data = await response.json()
            if (response.ok) {
                this.weatherData = {...this.weatherData, [id]: data}
            } else {
                throw Error(data.message)
            }
        } catch (e) {
            console.error(e.message)   
        }
    }
        
}

export default new FavsStore()