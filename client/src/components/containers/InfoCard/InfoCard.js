//styles
import './InfoCard.sass'
//images
import humidity from '../../../images/humidity.svg'
import pressure from '../../../images/pressure.svg'

const InfoCard = props => {

    const {weather} = props

    return (
        <div className='InfoCard'>
            <div className='InfoCard__detail-card'>
                <p>Humidity</p>
                <h5>{weather.humidity}</h5>
                <img src={humidity} alt='humidity icon'></img>
            </div>
            <div className='InfoCard__detail-card'>
                <p>Pressure</p>
                <img src={pressure} alt='pressure icon'></img>
                <h5>{weather.pressure}</h5>
                <h6>mm Hg</h6>
            </div>
            <div className='InfoCard__detail-card'>
                <p>Visibility</p>
                <img src={pressure} alt='visibility icon'></img>
                <h5>{weather.visibility >= 1000 ? weather.visibility / 1000 : weather.visibility}</h5>
                <h6>{weather.visibility >= 1000 ? 'km' : 'meters'}</h6>
            </div>
            <div className='InfoCard__detail-card'>
                <p>Wind</p>
                <img src={pressure} alt='wind icon'></img>
                <h5>{weather.windSpeed}</h5>
                <h6>m/s</h6>
            </div>
        </div>
    )
}

export default InfoCard