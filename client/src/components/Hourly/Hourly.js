import Divider from "../dividers/Divider"
import './Hourly.sass'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import tempConvert from "../../utilits/tempConvert";
import getWindDirection from "../../utilits/getWindDirection";
import windArrow from '../../images/wind.svg'
import { observer } from "mobx-react";
import windowSizeStore from "../../store/WindowSizeStore";

const Hourly = observer(props => {

    const { forecast } = props
    const forecastData = {...forecast}

    const getHourlyDOM = () => {
        return Object.values(forecastData).map((el) => {
            const data = {...el}
            const weather = {...data.weather[0]}
            // console.log(data)
            // console.log(weather)
            const time = new Date(data.dt * 1000)
            const curTime = `${time.getHours()}:00`
            // const day = date.getUTCDay()
            // console.log(day)
            // console.log(data)
            // console.log(temp)
            // console.log(weather)
            return(
                <SwiperSlide>
                    <div className='Hourly__card'>
                        <p className='Hourly__time'>{curTime}</p>
                        <img className='Hourly__icon'  src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt='weathr icon'></img>
                        <p className='Hourly__temp'>{tempConvert(data.temp)}</p>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <p className='Hourly__wind'>{`${Math.round(data.wind_speed)}m/s`}</p>
                            <img className='Hourly__arrow' src={windArrow} alt='wind direction' style={{transform: `rotate(${data.wind_deg}deg)`}}/>
                        </div>
                        {/* <p className={`Daily__day ${day >= 5 ? 'Daily__day_holiday' : ''}`}>{days[day]}</p>
                        <p className={`Daily__date ${day >= 5 ? 'Daily__date_holiday' : ''}`}>{curDate}</p>
                        <p className='Daily__temp'>{tempConvert(temp.day)}</p>
                        <p className='Daily__temp'>{tempConvert(temp.night)}</p>
                        <p className='Daily__weather-description'>{weather.description}</p> */}
                    </div>
                </SwiperSlide>
            )
        })
    }

    return (
        <>
            <Divider>hourly forecast</Divider>
            <div className='Hourly'>
                <Swiper
                    // width='100%'
                    spaceBetween={0}
                    slidesPerView={windowSizeStore.width > 1050 ? 16 : Math.ceil((windowSizeStore.width - 320 )/ 73) + 5}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                >
                    {getHourlyDOM()}
                </Swiper>
            </div>
        </>
    )
})

export default Hourly