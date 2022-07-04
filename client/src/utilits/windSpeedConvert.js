export const windSpeedConvert = (speed, units) => {
  return units === 'm/s' ? speed.toFixed(1) : (speed * 3.6).toFixed(1)
}