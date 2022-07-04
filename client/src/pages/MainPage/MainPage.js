import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { loadWeather } from '../../redux/actions/weather/loadWeather';
import getRequestUrl from '../../utilits/getRequestUrl';
import tempConvert from '../../utilits/tempConvert';
import './MainPage.sass'
import Loader from '../../components/Loader/Loader';
import SunCard from '../../components/SunCard/SunCard';
import { getCoords } from '../../redux/actions/coords/getCoords';
import favNo from '../../images/fav-no.svg'
import favYes from '../../images/fav-yes.svg'
import MiniButton from '../../components/buttons/MiniButton/MiniButton';
import weatherIcons from '../../variables/weatherIcons';
import {useAlert} from 'react-alert'
import { addFav as addfavAction } from '../../redux/actions/auth/addfav';
import { removeFav as removefavAction } from '../../redux/actions/auth/removefav';
import { windSpeedConvert } from '../../utilits/windSpeedConvert';
import { pressureConvert } from '../../utilits/pressureConvert';

const MainPage = props => {

    const HPA_TO_MMHG = 1.33322387415

    const { url } = useRouteMatch()
    const dispatch = useDispatch()
    const weatherData = useSelector(state => state.weather.data)
    const weatherIsLoaded = useSelector(state => state.weather.isLoaded)
    const degrees = useSelector(state => state.settings.degrees)
    const windUnits = useSelector(state => state.settings.windspeed)
    const pressureUnits = useSelector(state => state.settings.pressure)
    const auth = useSelector(state => state.auth)
    const alert = useAlert()

    useEffect(() => {
        if (url === '/') {
            dispatch(getCoords())
            return
        }
        if (url.slice(1,7) === 'coords') {
            const coords = url.slice(8).split('&').map((el) => {return el.slice(4,13)})
            if (!weatherIsLoaded) {
                dispatch( loadWeather( getRequestUrl(coords, 'curLoc') ) )
            }
            return
        }
        if (url.slice(1,3) === 'id') {
            const id = url.slice(4)
            if (!weatherIsLoaded) {
                dispatch( loadWeather( getRequestUrl(id, 'id') ) )
            }
            return
        }
    }, )

    const addFav = () => {
        dispatch(addfavAction(auth.userName, weatherData.id, alert))
    }
    const removeFav = () => {
        dispatch(removefavAction(auth.userName, weatherData.id, alert))
    }

    return (
        <div className='MainPage'>
            {weatherData ?
                <>
                    <div className='MainPage__location'>
                        <p>{weatherData.name ? `${weatherData.name}, ${weatherData.sys.country}` : 'Unknown location'}</p>
                        {auth.isAuth && 
                            <MiniButton 
                                onClick={auth.favs.includes(weatherData.id.toString()) ? removeFav : addFav}
                                icon={auth.favs.includes(weatherData.id.toString()) ? favYes : favNo}
                            />
                        }
                    </div>
                    <div className='MainPage__temp'>
                        <p className='MainPage__temp'>{tempConvert(weatherData.main.temp, degrees)}</p>
                        <img src={weatherIcons[weatherData.weather[0].icon]}></img>
                    </div>
                    <p className='MainPage__description'>{`Feels like ${tempConvert(weatherData.main.feels_like, degrees)}`}</p>
                    <div className='MainPage__info'>
                        <div className='MainPage__info-item'>
                            <p className='MainPage__info-title'>Humidity</p>
                            <p className='MainPage__info-data'>{`${weatherData.main.humidity}%`}</p>
                        </div>
                        <div className='MainPage__info-item'>
                            <p className='MainPage__info-title'>Wind</p>
                            <p className='MainPage__info-data'>{windSpeedConvert(weatherData.wind.speed, windUnits)}</p>
                            <p className='MainPage__info-unit'>{windUnits}</p>
                        </div>
                        <div className='MainPage__info-item'>
                            <p className='MainPage__info-title'>Pressure</p>
                            <p className='MainPage__info-data'>{pressureConvert(weatherData.main.pressure, pressureUnits)}</p>
                            <p className='MainPage__info-unit'>{pressureUnits}</p>
                        </div>
                        <div className='MainPage__info-item'>
                            <p className='MainPage__info-title'>Visibility</p>
                            <p className='MainPage__info-data'>{weatherData.visibility > 999 ? (weatherData.visibility / 1000).toFixed(0) : weatherData.visibility }</p>
                            <p className='MainPage__info-unit'>{weatherData.visibility > 999 ? 'km' : 'meters' }</p>
                        </div>
                    </div>
                    <SunCard data={weatherData}/>
                </>
            : <Loader/> }
        </div>
    );
}

export default MainPage;