const getRequestUrl = async (searchData, type) => {

    const getCoords = () => {
        if (type === 'curLoc') {
            return new Promise(resolve => {
                navigator.geolocation.getCurrentPosition(position => {
                    resolve(position.coords)
                });
            })
        }
        return 'lf ,kznm!'
    }

    const getUrl = async () => {
        if (type === 'forecast') {
            return 'https://api.openweathermap.org/data/2.5/onecall?' + 
            `lat=${searchData[0]}&` + 
            `lon=${searchData[1]}&` +
            'exclude=current,minutely,alerts&' + 
            'appid=54dc99a23c48019854e34a7c7c2d5978'
        } else if (type === 'find') {
            return 'https://api.openweathermap.org/data/2.5/find?' + 
            `q=${searchData[0]}&` +
            'units=metric&' + 
            'appid=54dc99a23c48019854e34a7c7c2d5978'
        } else {
            const coords = (type === 'curLoc') ? await getCoords() : {}
            return 'https://api.openweathermap.org/data/2.5/weather?' + 
            `${type === 'id' ? `id=${searchData}&` : ''}` + 
            `${type === 'curLoc' ? `lat=${coords.latitude}&` : ''}` + 
            `${type === 'curLoc' ? `lon=${coords.longitude}&` : ''}` + 
            `${type === 'refresh' ? `lat=${searchData[0]}&` : ''}` + 
            `${type === 'refresh' ? `lon=${searchData[1]}&` : ''}` + 
            `${type === 'name' ? `q=${searchData[0]}&` : ''}` + 
            'appid=54dc99a23c48019854e34a7c7c2d5978'
        }
    }

    const requestUrl = await getUrl()    

    return requestUrl
}

export default getRequestUrl