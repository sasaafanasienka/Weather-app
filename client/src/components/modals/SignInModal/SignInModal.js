import React from 'react';
import SignModal from '../SignModal/SignModal';
import { login } from '../../../redux/actions/auth/login';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'

const SignInModal = props => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const {closeFunc} = props

    const submitFunc = form => {
        dispatch(login(form, alert))
        closeFunc()
    }

    return (
        <SignModal closeFunc={closeFunc} submitFunc={submitFunc} title='Sign in'/>
    );
}

export default SignInModal;
