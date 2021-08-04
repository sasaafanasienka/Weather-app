import { makeAutoObservable } from "mobx"
import getRequestUrl from "../utilits/getRequestUrl"
import getTimeInterval from "../utilits/getTimeInterval.ts"
import tempConvert from "../utilits/tempConvert"
import forecastStore from "./ForecastStore"

class WeatherStore {

    data = null

    constructor() {
        makeAutoObservable(this)
        this.moveDataToStore = this.moveDataToStore.bind(this)
    }

    moveDataToStore(data) {
        const date = new Date()
        const newdata = {
            location: data.name,
            country: data.sys.country,
            flagLink: `https://www.countryflags.io/${data.sys.country}/flat/64.png`,
            iconLink: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            temp: tempConvert(data.main.temp),
            description: `Feels like ${tempConvert(data.main.feels_like)}, ${data.weather[0].description}`,
            currentDate: `Updated ${getTimeInterval(date.getTime(), data.dt * 1000)}`,
            currentTime: date.getTime(),
            locationLat: data.coord.lat,
            locationLon: data.coord.lon,
            id: data.id,
            weatherCode: data.weather[0].id,
            humidity: `${data.main.humidity}%`,
            pressure: Math.round(Number(data.main.pressure) * 0.75006168),
            windSpeed: Math.round(Number(data.wind.speed)),
            windDegree: data.wind.deg,
            visibility: data.visibility,
            sunrise: data.sys.sunrise * 1000,
            sunset: data.sys.sunset * 1000,
            timezone: data.timezone * 1000
        }
        console.log(newdata)
        this.data = newdata
    }

    async fetch(URL) {
        this.error = ''
        try {
            const res = await fetch(URL)
            if (res.ok) {
                const data = await res.json()
                forecastStore.loadForecast([data.coord.lat, data.coord.lon], 'forecast')
                this.moveDataToStore(data)
                console.log(data)
            } else if (res.status === 404) {
                throw res.statusText
            } else {
                throw res.statusText
            }
        } catch (err) {
            this.error = err
        }
    }

    async loadByCityName(city) {
        const URL = await getRequestUrl([city], 'name')
        this.fetch(URL)
    }
    
    async loadByGeolocation() {
        const URL = await getRequestUrl('' ,'curLoc')
        this.fetch(URL)
    }

    async loadBYCityId(id) {
        const URL = await getRequestUrl(id, 'id')
        this.fetch(URL)
    }

    async refresh() {
        const URL = await getRequestUrl([this.locationLat, this.locationLon] ,'refresh')
        this.fetch(URL)
    }
    
}

export default new WeatherStore()