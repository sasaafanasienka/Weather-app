import React, {useState, useEffect} from 'react';
import getRequestUrl from '../../utilits/getRequestUrl';
import MiniButton from '../buttons/MiniButton/MiniButton';
import Loader from '../Loader/Loader';
import './FavItem.sass'
import favYes from '../../images/fav-yes.svg'
import tempConvert from '../../utilits/tempConvert';
import weatherIcons from '../../variables/weatherIcons';
import { useDispatch, useSelector } from 'react-redux';
import { removeFav as removefavAction } from '../../redux/actions/auth/removefav';
import {useAlert} from 'react-alert'
import {useHistory} from 'react-router-dom'
import { clearWeather } from '../../redux/actions/weather/clearWeather';

const FavItem = props => {

    const { id, type } = props
    const [weather, setWeather] = useState(null)
    const dispatch = useDispatch()
    const auth = useSelector(state => {return state.auth})
    const alert = useAlert()
    const history = useHistory()

    const pushToPage = (event) => {
        if (event.nativeEvent.path[0].id || event.nativeEvent.path[1].id || event.nativeEvent.path[2].id) {
            dispatch(clearWeather())
            history.push(`./id&${id}`)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(getRequestUrl(id, 'id'))
            const data = await response.json()
            if (response.ok) {
                setWeather(data)
            }
        }
        if (!weather && type !== 'nofavs') {
            fetchData()
        }
    });

    const removefav = () => {
        dispatch(removefavAction(auth.userName, id, alert))
    }

    if ( type === 'nofavs' ) {
        return (
            <div className='FavItem'>
                <div className='FavItem__location'>
                    <p className='FavItem__location-name'>No favourites yet</p>
                </div>
            </div>
        )
    }

    return (
        <div className='FavItem' onClick={pushToPage} id={id}>
            {weather ? 
                <>  
                    <div className='FavItem__location'>
                        {weather.sys.country && 
                            <img className='FavItem__location-flag' 
                                src={`https://www.countryflags.io/${weather.sys.country}/flat/32.png`}
                                alt=''
                            ></img>
                        }
                        <p className='FavItem__location-name'>{weather.name}</p>
                        <MiniButton
                            onClick={removefav}
                            icon={favYes}
                            style={{position: 'absolute', top: '-4px', right: '-34px'}}
                        />
                    </div>
                    <div className='FavItem__weather'>
                        <p className='FavItem__weather-temp'>{tempConvert(weather.main.temp)}</p>
                        <img className='FavItem__weather-icon' src={weatherIcons[weather.weather[0].icon]} alt=''></img>
                    </div>
                </> 
                : 
                <Loader/>
            }
        </div>
    );
}

export default FavItem;