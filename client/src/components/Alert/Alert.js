import React from 'react';
import MiniButton from '../buttons/MiniButton/MiniButton'
import './Alert.sass'
import closeIcon from '../../images/close.svg'
import smile from '../../images/smile.svg'
import sad from '../../images/sad.svg'
import surprise from '../../images/surprise.svg'

const Alert = props => {
    const { style, options, message, close } = props

    return (
        <div className='Alert'>
            {options.type === 'info' && <img className='Alert__icon' src={surprise}></img>}
            {options.type === 'success' && <img className='Alert__icon' src={smile}></img>}
            {options.type === 'error' && <img className='Alert__icon' src={sad}></img>}
            <p>{message}</p>
            {/* <MiniButton onClick={close} icon={closeIcon} style={{position: 'absolute', top: '6px', right: '18px'}}/> */}
        </div>
    );
}

export default Alert;