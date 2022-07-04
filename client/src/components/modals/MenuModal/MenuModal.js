import React, { useState } from 'react';
import BluredBackground from '../../BluredBackground/BluredBackround';
import MiniButton from '../../buttons/MiniButton/MiniButton';
import './MenuModal.sass'
import close from '../../../images/close.svg'
import { useDispatch, useSelector } from 'react-redux';
import { degreesCelsius, degreesFahrenheit } from '../../../redux/actions/settings/degrees';
import MenuModalOption from './MenuModalOption/MenuModalOption';
import { speedKMH, speedMS } from '../../../redux/actions/settings/windSpeed';
import { pressureATMO, pressureHPA, pressureMMHG } from '../../../redux/actions/settings/pressure';

const MenuModal = props => {

  const { closeFunc } = { ...props }

  const settingsStore = useSelector(state => {return state.settings})
  const dispatch = useDispatch()

  const [dropDowns, setDropDowns] = useState({
    degrees: false,
    windspeed: false,
    pressure: false
  })

  const toggleDropDown = (name) => {
    if (dropDowns[name]) {
      setDropDowns({...dropDowns, [name]: false})
    } else {
      const keysArr = Object.keys(dropDowns)
      const res = {}
      keysArr.forEach(el => {
        if (el === name) {
          res[el] = true
        } else {
          res[el] = false
        }
      })
      setDropDowns(res)
    }
  }

  return (
    <>
      <div className='MenuModal'>
        <MiniButton onClick={closeFunc} icon={close} style={{position: 'absolute', top: '10px', right: '10px'}} />
        <h4>Settings</h4>
        <MenuModalOption data={{
          name: 'Degrees',
          toggler: () => { toggleDropDown('degrees') },
          value: settingsStore.degrees,
          isShow: dropDowns.degrees,
          options: [
            ['Celsius', () => { dispatch(degreesCelsius()) }],
            ['Fahrenheit', () => { dispatch(degreesFahrenheit()) }],
          ]
          }}
        />
        <MenuModalOption data={{
          name: 'Wind speed',
          toggler: () => { toggleDropDown('windspeed') },
          value: settingsStore.windspeed,
          isShow: dropDowns.windspeed,
          options: [
            ['m/s', () => { dispatch(speedMS()) }],
            ['km/h', () => { dispatch(speedKMH()) }],
          ]
          }}
        />
        <MenuModalOption data={{
          name: 'Pressure',
          toggler: () => { toggleDropDown('pressure') },
          value: settingsStore.pressure,
          isShow: dropDowns.pressure,
          options: [
            ['hPa', () => { dispatch(pressureHPA()) }],
            ['mmHg', () => { dispatch(pressureMMHG()) }],
            ['atm.', () => { dispatch(pressureATMO()) }]
          ]
        }}
        />
      </div>
    </>
  );
}

export default MenuModal;
