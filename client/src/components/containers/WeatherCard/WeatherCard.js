import './WeatherCard.sass'
import auth from '../../../store/AuthStore'
import favsStore from '../../../store/FavsStore'
import MiniButton from "../../buttons/MiniButton/MiniButton"
import favYes from '../../../images/fav_yes.svg'
import favNo from '../../../images/fav_no.svg'
import { observer } from "mobx-react"

const WeatherCard =  observer(props => {
    
    const {data} = props
    const favs = [...favsStore.favsList]

    console.log(favs)

    const addFav = () => {
        favsStore.addFav(data.id)
    }

    const removeFav = () => {
        favsStore.removeFav(data.id)
    }

    return(
        <div className='WeatherCard'>
            <span className='WeatherCard__location-container'>
                {`${data.location}, ${data.country}`}
            </span>
            <span className='WeatherCard__temp-container'>
                {/* <img className='WeatherCard__icon' src={data.iconLink} alt='flag'/> */}
                {data.temp}
            </span>
            <p className='WeatherCard__description'>{data.description}</p>
            <p className='WeatherCard__description'>{data.currentDate}</p>
            {auth.isAuth && 
                <div className='WeatherCard__button-row'>
                    <MiniButton 
                        icon={favs.includes(data.id) ? favYes : favNo} 
                        onClick={favs.includes(data.id) ? removeFav : addFav}
                    />
                </div>
            }
        </div>
    )
})

export default WeatherCard