export const transformWeatherToColor = (weatherCode) => {
    const codes = {
        clear: [800],
        thunderStorm: [200,201,202,210,211,212,221,230,231,232],
        drizzle: [300,301,302,310,311,312,313,314,321],
        rain: [500,501,502,503,504,511,520,521,522,531],
        snow: [600,601,602,611,612,613,615,616,620,621,622],
        atmosphere: [701,711,721,731,741,751,761,762,771,781],
        clouds: [801,802,803,804]
    }
    if (codes.clear.includes(weatherCode)) {
        return 'linear-gradient(165deg, rgba(0,170,255,1) 0%, rgba(0,212,255,1) 100%)'
    }
    if (codes.thunderStorm.includes(weatherCode)) {
        return 'linear-gradient(165deg, rgba(19,45,70,1) 0%, rgba(0,89,176,1) 100%)'
    }
    if (codes.drizzle.includes(weatherCode) || codes.rain.includes(weatherCode)) {
        return 'linear-gradient(165deg, rgba(184,184,184,1) 0%, rgba(135,165,195,1) 100%);'
    }
    if (codes.snow.includes(weatherCode) || codes.atmosphere.includes(weatherCode)) {
        return 'linear-gradient(165deg, rgba(184,184,184,1) 0%, rgba(232,232,232,1) 100%);'
    }
    if (codes.clear.includes(weatherCode)) {
        return 'linear-gradient(165deg, rgba(0,170,255,1) 0%, rgba(0,212,255,1) 100%)'
    }
    if (codes.clouds.includes(weatherCode)) {
        return 'linear-gradient(165deg, rgba(91,189,238,1) 0%, rgba(210,247,255,1) 100%)'
    }
    return 'linear-gradient(165deg, rgba(91,189,238,1) 0%, rgba(210,247,255,1) 100%)'
}

export const transformTimeToColor = (time) => {
    if (time === 'day') {
        return 'linear-gradient(165deg, rgba(41,183,255,1) 0%, rgba(88,210,236,1) 100%);'
    } else {
        return 'linear-gradient(165deg, rgba(0,0,0,1) 0%, rgba(0,3,84,1) 100%);'
    }
}