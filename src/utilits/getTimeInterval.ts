const getTimeInterval = (currentTime:number, timeToCount:number):string => {
    const interval = currentTime - timeToCount
    if (interval < 30000) { return 'just now' }
    if (interval < 600000) { return `${Math.round(interval / 60 / 1000)} minutes ago` }
    if (interval < 3600000) { return `${Math.ceil(interval / 60 / 1000 / 5) * 5} minutes ago` }
    if (interval < 86400000) { return `${Math.ceil(interval / 60 / 1000 / 60)} hours ago` }
    return `${Math.ceil(interval / 60 / 1000 / 60 / 24)} days ago`   
}

export default getTimeInterval