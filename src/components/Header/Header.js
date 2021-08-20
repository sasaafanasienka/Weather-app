import React, { useState, useEffect } from 'react'
import './Header.sass'
import logo from '../../images/logo.svg'
const Header = () => {

    return (
        <>
            <header className='Header'>
                <img className='Header__logo' src={logo}></img>
            </header>
        </>
    )
}

export default Header