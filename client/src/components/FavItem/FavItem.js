import { observer } from 'mobx-react'
import './FavItem.sass'
import favs from '../../store/FavsStore'
import { useEffect } from 'react'
import tempConvert from '../../utilits/tempConvert'
import MiniButton from '../buttons/MiniButton/MiniButton'
import removeFav from '../../images/fav_yes.svg'
import MiniLoader from '../loaders/MiniLoader/MiniLoader'
import { useHistory } from "react-router-dom";

const FavItem = observer((props) => {

    const { id } = props
    const weatherData = {...favs.weatherData}
    const history = useHistory()

    useEffect(() => {
        if (!weatherData[id]) {
            favs.loadWeatherData(id)
        }
    })

    const pushToPage = (event) => {
        if (event.target.id) {
            history.push(`./${id}`)
        }
    }

    return(
        <button key={id} className='FavItem' onClick={pushToPage}>
            {
                favs.weatherData[id] === undefined ?
                <MiniLoader/> :
                <>
                    <div className='FavItem__listener-layer' id={id} ></div>
                    <div className='FavItem__button-row'>
                        <MiniButton icon={removeFav} onClick={() => {favs.removeFav(id)}}></MiniButton>
                    </div>
                    <span className='FavItem__location'>
                        <p>{favs.weatherData[id].name}</p>
                        <img src={`https://www.countryflags.io/${favs.weatherData[id].sys.country}/flat/64.png`} alt='flag'></img>
                    </span>
                    <p className='FavItem__temp'>{tempConvert(favs.weatherData[id].main.temp)}</p>
                </>
            }
        </button>
    )
})

export default FavItem