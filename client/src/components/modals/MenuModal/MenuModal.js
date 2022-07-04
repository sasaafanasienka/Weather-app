import React, { useState } from 'react';
import BluredBackground from '../../BluredBackground/BluredBackround';
import MiniButton from '../../buttons/MiniButton/MiniButton';
import './MenuModal.sass'
import close from '../../../images/close.svg'
import { useDispatch, useSelector } from 'react-redux';
import { degreesCelsius, degreesFahrenheit } from '../../../redux/actions/settings/degrees';

const MenuModal = props => {

  const { closeFunc } = { ...props }

  const settingsStore = useSelector(state => {return state.settings})
  const dispatch = useDispatch()

  console.log(settingsStore)

  const [dropDowns, setDropDowns] = useState({
    degrees: false
  })

  const toggleDropDown = (name) => {
    console.log(name)
    if (dropDowns[name]) {
      setDropDowns({...dropDowns, [name]: false})
    } else {
      setDropDowns({...dropDowns, [name]: true})
    }
  }

  return (
    <>
      <div className='MenuModal'>
        <MiniButton onClick={closeFunc} icon={close} style={{position: 'absolute', top: '10px', right: '10px'}} />
        <h4>Settings</h4>
        <div className='MenuModal__option'>
          <p>Degrees:</p>
          <div className='MenuModal__dropdown'
            onClick={() => {toggleDropDown('degrees')}}
          >
            {settingsStore.degrees}
            { dropDowns.degrees === true && <div className='MenuModal__dropdown-wrp'>
              <button
                className='MenuModal__dropdown-option'
                onClick={() => { dispatch(degreesCelsius()) }}
              >
                Celsius
              </button>
              <button
                className='MenuModal__dropdown-option'
                onClick={() => { dispatch(degreesFahrenheit()) }}
              >
                Fahrenheit
              </button>
            </div>}
          </div>
        </div>
      </div>
      <BluredBackground zIndex='29'/>
    </>
  );
}

export default MenuModal;
