import PageTemplate from "../../components/PageTemplate/PageTemplate"
import auth from '../../store/AuthStore'
import Divider from "../../components/dividers/Divider.js";
import { observer } from "mobx-react";
import Favourites from "../../components/Favourites/Favourites.js";
import Loader from "../../components/loaders/Loader/Loader.js";
import GreyLoader from "../../components/loaders/GreyLoader/GreyLoader.js"; 
import { useEffect } from "react";
import weatherStore from "../../store/WeatherStore.js";

const LoadingPage = observer(props => {

    const weatherData = {...weatherStore.data}

    useEffect(() => {
        // auth.localLogin()
        if (!weatherData.id) {
        weatherStore.loadByGeolocation()
        }
    })

    return(
        <PageTemplate>
            <GreyLoader/>
        </PageTemplate>
    )
})

export default LoadingPage