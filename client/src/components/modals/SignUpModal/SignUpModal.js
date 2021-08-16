import React from 'react';
import { useDispatch } from 'react-redux';
import SignModal from '../SignModal/SignModal';
import { register } from '../../../redux/actions/auth/register';
import { useAlert } from 'react-alert'

const SignUpModal = props => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const {closeFunc} = props

    const submitFunc = form => {
        dispatch(register(form, alert))
        closeFunc()
    }

    return (
        <SignModal closeFunc={closeFunc} submitFunc={submitFunc} title='Sign up' />
    );
}

export default SignUpModal;