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
import weatherIcons from '../../variables/weatherIcons';

const MainPage = props => {

    const HPA_TO_MMHG = 1.33322387415

    const { url } = useRouteMatch()
    console.log(url)
    const dispatch = useDispatch()
    const weatherData = useSelector(state => {return state.weather.data})
    const weatherIsLoaded = useSelector(state => {return state.weather.isLoaded})

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

    return (
        <div className='MainPage'>
            {weatherData ?
                <>
                    <div className='MainPage__location'>
                        {weatherData.sys.country && 
                            <img className='MainPage__location-flag' 
                                src={`https://www.countryflags.io/${weatherData.sys.country}/flat/32.png`}
                            ></img>
                        }
                        <p>{weatherData.name ? weatherData.name : 'Unknown location'}</p>
                    </div>
                    <div className='MainPage__temp'>
                        <p className='MainPage__temp'>{tempConvert(weatherData.main.temp)}</p>
                        <img src={weatherIcons[weatherData.weather[0].icon]}></img>
                    </div>
                    <p className='MainPage__description'>{`Feels like ${tempConvert(weatherData.main.feels_like)}`}</p>
                    <div className='MainPage__info'>
                        <div className='MainPage__info-item'>
                            <p className='MainPage__info-title'>Humidity</p>
                            <p className='MainPage__info-data'>{`${weatherData.main.humidity}%`}</p>
                        </div>
                        <div className='MainPage__info-item'>
                            <p className='MainPage__info-title'>Wind</p>
                            <p className='MainPage__info-data'>{weatherData.wind.speed.toFixed(1)}</p>
                            <p className='MainPage__info-unit'>m/s</p>
                        </div>
                        <div className='MainPage__info-item'>
                            <p className='MainPage__info-title'>Pressure</p>
                            <p className='MainPage__info-data'>{(weatherData.main.pressure/HPA_TO_MMHG).toFixed(0)}</p>
                            <p className='MainPage__info-unit'>mmHg</p>
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