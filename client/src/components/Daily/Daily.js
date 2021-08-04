import tempConvert from '../../utilits/tempConvert'
import { days, months } from '../../variables/date'
import './Daily.sass'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import Divider from '../dividers/Divider';
import { observer } from 'mobx-react';
import windowSizeStore from '../../store/WindowSizeStore';

const Daily = observer ( props => {

    const { forecast } = props
    const forecastData = {...forecast}

    const getDailyDOM = () => {
        return Object.values(forecastData).map((el) => {
            const data = {...el}
            const temp = {...data.temp}
            const weather = {...data.weather[0]}
            const date = new Date(data.dt * 1000)
            const day = date.getUTCDay()
            const curDate = `${months[date.getUTCMonth()]}, ${date.getUTCDate()}`
            return(
                <SwiperSlide>
                    <div className='Daily__card'>
                        <p className={`Daily__day ${day >= 5 ? 'Daily__day_holiday' : ''}`}>{days[day]}</p>
                        <p className={`Daily__date ${day >= 5 ? 'Daily__date_holiday' : ''}`}>{curDate}</p>
                        <p className='Daily__temp'>{tempConvert(temp.day)}</p>
                        <p className='Daily__temp'>{tempConvert(temp.night)}</p>
                        <p className='Daily__weather-description'>{weather.description}</p>
                    </div>
                </SwiperSlide>
            )
        })
    }

    return (
        <>
            <Divider>daily forecast</Divider>
            <div className='Daily'>
                <Swiper
                    // width='100%'
                    spaceBetween={15}
                    slidesPerView={windowSizeStore.width > 1050 ? 8 : Math.ceil((windowSizeStore.width - 320) / 146) + 2 }
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                >
                {getDailyDOM()}
                </Swiper>
            </div>
        </>
    )
})

export default Daily