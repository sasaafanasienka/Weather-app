import './SunCard.sass'
//images
import sunLine from '../../../images/sun_line.svg'
import sun from '../../../images/sun.svg'
import getHoursMinutes from '../../../utilits/getHoursMinutes'
import getFullDate from '../../../utilits/getFullDate'
import daybkgrnd from '../../../images/day.png'
import nightbkgrnd from '../../../images/night.png'

const SunCard = props => {

    const {data} = props

    const MILISECONDS_PER_MINUTE = 1000 * 60

    const isDay = data.currentTime > data.sunrise && data.currentTime < data.sunset
    const dayLengthInMinutes = Math.round(( data.sunset - data.sunrise ) / MILISECONDS_PER_MINUTE)
    const dayLengthHours = Math.floor(dayLengthInMinutes / 60)
    const dayLengthMins = dayLengthInMinutes - dayLengthHours * 60
    const sunTimeLineAngle = (data.currentTime - data.sunrise) / (data.sunset - data.sunrise) * Math.PI
    const sunIconXCoord = ((50 * Math.cos(sunTimeLineAngle)) * -1 + 50)
    const sunIconYCoord = Math.sin(sunTimeLineAngle) * 100

    return (
        <div className='SunCard' >
            <p className='SunCard__current-date'>{getFullDate(data.currentTime + data.timezone)}</p>
            <p className='SunCard__title'>Day length</p>
            <p className='SunCard__day-length'>{`${dayLengthHours}h ${dayLengthMins}m`}</p>
            <div className='SunCard__sun-path'>
                <img className='SunCard__sun-path-line' src={sunLine} alt='sun path'/>
                { isDay && 
                    <img 
                        className='SunCard__sun-path-sun' 
                        src={sun} 
                        alt='sun'
                        style={{
                            bottom: `calc(${sunIconYCoord}% - 16px)`,
                            left: `calc(${sunIconXCoord}% - 16px)`,
                        }}
                    />
                }
                <p className='SunCard__sun-path-text'>
                    {`${getHoursMinutes(data.sunrise + data.timezone)} - ${getHoursMinutes(data.sunset + data.timezone)}`}
                </p>
            </div>
            <img 
                className='SunCard__background'
                src={isDay ? daybkgrnd : nightbkgrnd}
                alt='background'
            />
                {/* <p>{weather.sunrise}</p>
                <p>{weather.sunset}</p> */}
        </div>
    )
}

export default SunCard