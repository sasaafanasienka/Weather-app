const tempConvert = (kalvinTemp, degrees = 'Celsius') => {
    const celsius = Math.round(kalvinTemp - 273)
    const fahrenheit = Math.round((kalvinTemp - 273) * 1.8 + 32)
    if (degrees.trim() === 'Celsius') {
        return `${celsius > 0 ? '+' : ''}${celsius}\u00B0С`
    } else {
        return `${fahrenheit > 0 ? '+' : ''}${fahrenheit}\u00B0F`
    }
}

export default tempConvert