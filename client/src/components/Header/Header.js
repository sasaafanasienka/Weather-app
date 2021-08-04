import { observer } from 'mobx-react'
import React, { useState } from 'react'
import Button from '../buttons/Button/Button'
import authStore from '../../store/AuthStore'
import user from '../../store/UserStore'
import './Header.sass'
import logo from '../../images/logo.svg'
import manUser from '../../images/man.svg'
import DropdownMenu from '../dropdowns/DropdownMenu/DropdownMenu'
import DropdownMenuItem from '../dropdowns/DropdownMenuItem/DropdownMenuItem'
import { useHistory } from "react-router-dom";

const Header = observer(() => {

    const history = useHistory()

    const [ dropdowns, setDropdowns ] = useState({
        userMenu: false
    })

    const openDropdown = (name) => {
        setDropdowns((prev) => { return({...prev, [name]: true })})
    }
    const closeDropdown = (name) => {
        setDropdowns((prev) => { return({...prev, [name]: false })})
    }
    const toggleDropdown = (name) => {
        console.log(dropdowns[name])
        setDropdowns((prev) => { return({...prev, [name]: !prev[name] })})
    }

    const logout = () => {
        authStore.logout()
    }

    const authBlock = () => {
        if (authStore && authStore.isAuth) {
            return(
                <div className='Header__username-button' onClick={() => {toggleDropdown('userMenu')}}>
                    <div>
                        <p className='Header__username'>{user.name}</p>
                        <p className='Header__username'>{user.surname}</p>
                    </div>
                    <img style={{height: '36px'}} src={manUser}></img>
                    { dropdowns['userMenu'] &&
                    <DropdownMenu closeFunc={() => {closeDropdown('userMenu')}}>
                        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                    </DropdownMenu>
                    }
                </div>
            )
        }

        return(
            <div>
                <Button onClick={() => {history.push('/register')}}>Sign up</Button>
                <Button onClick={() => {history.push('/login')}}>Sign in</Button>
            </div>
        )
    }

    return (
        <header className='Header'>
            <img className='Header__logo' src={logo} onClick={() => {history.push('/')}}></img>
            {authBlock()}
        </header>
    )
})

export default Header