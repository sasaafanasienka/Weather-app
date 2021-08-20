const getHoursMinutes = (miliseconds) => {
    const date = new Date(miliseconds)
    const dateHours = date.getUTCHours()
    const dateMinutes = date.getUTCMinutes()
    const hours = dateHours < 10 ? '0' + dateHours : dateHours
    const minutes = dateMinutes < 10 ? '0' + dateMinutes : dateMinutes
    return hours + ':' + minutes
}

export default getHoursMinutes