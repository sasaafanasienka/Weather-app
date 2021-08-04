import getHoursMinutes from "./getHoursMinutes"

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ]

const getFullDate = miliseconds => {
    const date = new Date(miliseconds)
    const time = getHoursMinutes(miliseconds)
    const month = date.getUTCMonth()
    const num = date.getUTCDate()
    const year = date.getUTCFullYear()
    return time + ', ' + months[month] + ' ' + num + ', ' + year
}

export default getFullDate