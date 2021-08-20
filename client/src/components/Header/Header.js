import React, { useState, useEffect } from 'react'
import './Header.sass'
import logo from '../../images/logo.svg'
import {useHistory} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearWeather } from '../../redux/actions/weather/clearWeather'

const Header = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const pushToMainPage = () => {
        history.push('/')
        dispatch(clearWeather())
    }

    return (
        <>
            <header className='Header'>
                <img className='Header__logo' src={logo} onClick={pushToMainPage}></img>
            </header>
        </>
    )
}

export default Header