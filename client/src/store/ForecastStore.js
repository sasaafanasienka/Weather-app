import { makeAutoObservable } from "mobx"
import getRequestUrl from "../utilits/getRequestUrl"
import getTimeInterval from "../utilits/getTimeInterval.ts"
import tempConvert from "../utilits/tempConvert"

class ForecastStore {

    isLoaded = false
    data = null

    constructor() {
        makeAutoObservable(this)
    }

    async fetch(URL) {
        this.isLoaded = false
        this.error = ''
        try {
            const res = await fetch(URL)
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                this.isLoaded = true
                this.data = data
            } else if (res.status === 404) {
                throw res.statusText
            } else {
                throw res.statusText
            }
        } catch (err) {
            this.error = err
        } finally {
            this.isLoaded = true
        }
    }

    async loadForecast(coords) {
        const URL = await getRequestUrl(coords ,'forecast')
        this.fetch(URL)
    }

}

export default new ForecastStore()

// {
//     "coord": {
//         "lon": 27.5667,
//         "lat": 53.9
//     },
//     "weather": [
//         {
//             "id": 802,
//             "main": "Clouds",
//             "description": "scattered clouds",
//             "icon": "03d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 274.99,
//         "feels_like": 271.13,
//         "temp_min": 274.82,
//         "temp_max": 275.15,
//         "pressure": 1014,
//         "humidity": 75
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 4,
//         "deg": 290,
//         "gust": 8
//     },
//     "clouds": {
//         "all": 40
//     },
//     "dt": 1619335320,
//     "sys": {
//         "type": 1,
//         "id": 8939,
//         "country": "BY",
//         "sunrise": 1619318768,
//         "sunset": 1619371736
//     },
//     "timezone": 10800,
//     "id": 625144,
//     "name": "Minsk",
//     "cod": 200
// }