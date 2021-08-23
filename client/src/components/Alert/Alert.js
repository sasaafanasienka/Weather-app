import React from 'react';
import './Alert.sass'
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
        </div>
    );
}

export default Alert;