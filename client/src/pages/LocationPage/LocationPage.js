import PageTemplate from "../../components/PageTemplate/PageTemplate"
import authStore from "../../store/AuthStore";
import weatherStore from "../../store/WeatherStore";
import forecastStore from "../../store/ForecastStore";
import { observer } from "mobx-react";
import Favourites from "../../components/Favourites/Favourites.js";
import './LocationPage.sass'
import { useEffect } from "react";
import tempConvert from "../../utilits/tempConvert";
import Loader from "../../components/loaders/Loader/Loader";
import WeatherCard from "../../components/containers/WeatherCard/WeatherCard";
import humidity from '../../images/humidity.svg'
import pressure from '../../images/pressure.svg'
import Daily from "../../components/Daily/Daily";
import Hourly from "../../components/Hourly/Hourly";
import SearchForm from "../../components/SearchForm/SearchForm.js";
import SunCard from "../../components/containers/SunCard/SunCard";
import InfoCard from "../../components/containers/InfoCard/InfoCard";

const LocationPage = observer(() => {

    const pageId = window.location.pathname.slice(1)

    const weather = {...weatherStore.data}
    const forecast = forecastStore.data ? {...forecastStore.data} : null

    useEffect(() => {
        if(!weather.id || Number(pageId) !== weather.id) {
            weatherStore.loadBYCityId(pageId)
        }
    })

    return(
        <PageTemplate>
            <Favourites isAuth={authStore.isAuth}/>
            <SearchForm/>
            <div className='Location__weather-container'>
                <WeatherCard data={weather}/>
                <InfoCard weather={weather} />
                <SunCard data={weather}/>
            </div>
            <Hourly forecast={forecast ? forecast.hourly : null}/>
            <Daily forecast={forecast ? forecast.daily : null}/>
        </PageTemplate>
    )
})

export default LocationPage