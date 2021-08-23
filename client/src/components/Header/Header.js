import React, { useState, useEffect } from 'react'
import Button from '../buttons/Button/Button'
import './Header.sass'
import logo from '../../images/logo.svg'
import logoutIcon from '../../images/log-out.svg'
import SignInModal from '../modals/SignInModal/SignInModal'
import SignUpModal from '../modals/SignUpModal/SignUpModal'
import { useDispatch, useSelector } from 'react-redux'
import MiniButton from '../buttons/MiniButton/MiniButton'
import { logout as logoutAction } from '../../redux/actions/auth/logout'
import {useAlert} from 'react-alert'
import { getCookie } from '../../utilits/cookies'
import { localLogin } from '../../redux/actions/auth/localLogin'
import {useHistory} from 'react-router-dom'
import { clearWeather } from '../../redux/actions/weather/clearWeather'

const Header = () => {

    const authStore = useSelector(state => {return state.auth})
    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()

    useEffect(() => {
        const token = getCookie('token')
        const userName = getCookie('userName')
        const favs = getCookie('favs')
        if (token && userName && favs && !authStore.isAuth) {
            dispatch(localLogin(token, userName, favs, alert))
        }
    })

    const [modals, setModals] = useState({
        signIn: false,
        signUp: false
    })

    const toggleModal = (name, method) => {
        setModals(
            {...modals, [name]: method === 'close' ? false : method === 'open' ? true : !modals[name]}
        )
    }

    const pushToMainPage = () => {
        history.push('/')
        dispatch(clearWeather())
    }

    const logout = () => {
        dispatch(logoutAction(alert))
    }

    const authBlock = () => {
        if (authStore.isAuth) {
            return (
                <div className='Header__auth-block'>
                    <p>{`Hello, ${authStore.userName}!`}</p>
                    <MiniButton icon={logoutIcon} onClick={logout}/>
                </div>
            )
        }
        return(
            <div className='Header__auth-block'>
                <Button onClick={() => { toggleModal('signIn') }}>Sign in</Button>
                <Button onClick={() => { toggleModal('signUp') }}>Sign up</Button>
            </div>
        )
    }

    return (
        <>
            <header className='Header'>
                <img className='Header__logo' src={logo} onClick={pushToMainPage}></img>
                {authBlock()}
            </header>
            { modals.signIn && <SignInModal closeFunc={ () => {toggleModal('signIn', 'close')} }/> }
            { modals.signUp && <SignUpModal closeFunc={ () => {toggleModal('signUp', 'close')} }/> }
        </>
    )
}

export default Header