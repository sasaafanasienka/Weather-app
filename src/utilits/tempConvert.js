const tempConvert = (kalvinTemp) => {
    const celsius = Math.round(kalvinTemp - 273)
    return `${celsius > 0 ? '+' : ''}${celsius}\u00B0`
}

export default tempConvert