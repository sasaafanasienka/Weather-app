const HPA_TO_MMHG = 1.33322387415
const HPA_TO_ATM = 0.000987


export const pressureConvert = (hpa, units) => {
  if (units === 'hPa') {
    return hpa
  } else if (units === 'mmHg') {
    return (hpa / HPA_TO_MMHG).toFixed(0)
  } else if (units === 'atm.') {
    return (hpa * HPA_TO_ATM).toFixed(3)
  }
}