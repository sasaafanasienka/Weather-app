import React, {useState} from 'react';
import MiniButton from '../../buttons/MiniButton/MiniButton';
import './SignModal.sass'
import close from '../../../images/close.svg'
import BluredBackground from '../../BluredBackground/BluredBackround';
import Input from '../../inputs/Input/Input';
import DarkButton from '../../buttons/DarkButton/DarkButton';

const SignModal = props => {

    const {closeFunc, title, submitFunc} = props

    const [ form, setForm ] = useState({
        login: '',
        password: ''
    })
    
    const handleChange = event => {
        setForm({
            ...form, [event.target.id]: event.target.value 
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        submitFunc(form)
    }

    return (
        <>
            <div className='SignModal'>
                <MiniButton onClick={closeFunc} icon={close} style={{position: 'absolute', top: '10px', right: '10px'}} />
                <h4>{title}</h4>
                <form onSubmit={handleSubmit}>
                    <label>Login</label>
                    <Input
                        placeholder='Login'
                        onChange={handleChange}
                        id='login'
                        type='text'
                    />
                    <label>Password</label>
                    <Input
                        placeholder='Password'
                        onChange={handleChange}
                        id='password'
                        type='password'
                    />
                    <DarkButton type='submit'>{title}</DarkButton>
                </form>
            </div>
            <BluredBackground zIndex='29'/>
        </>
    );
}

export default SignModal;
