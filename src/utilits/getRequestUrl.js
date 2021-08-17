const getRequestUrl = (searchData, type) => {

    const getUrl = () => {
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
            return 'https://api.openweathermap.org/data/2.5/weather?' + 
            `${type === 'id' ? `id=${searchData}&` : ''}` + 
            `${type === 'curLoc' ? `lat=${searchData[0]}&` : ''}` + 
            `${type === 'curLoc' ? `lon=${searchData[1]}&` : ''}` + 
            `${type === 'refresh' ? `lat=${searchData[0]}&` : ''}` +    
            `${type === 'refresh' ? `lon=${searchData[1]}&` : ''}` + 
            `${type === 'name' ? `q=${searchData[0]}&` : ''}` + 
            'appid=54dc99a23c48019854e34a7c7c2d5978'
        }
    }

    const requestUrl = getUrl()   
    return requestUrl
}

export default getRequestUrl