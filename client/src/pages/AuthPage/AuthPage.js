import { useEffect, useState } from "react"
import PageTemplate from "../../components/PageTemplate/PageTemplate"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import Title from "../../components/styled/text/Title"
import Input from "../../components/styled/inputs/Input"
import InputLabel from "../../components/styled/inputs/InputLabel"
import InputField from "../../components/styled/inputs/InputField"
import BlueButton from "../../components/styled/buttons/BlueButton"
import Link from "../../components/styled/links/Link"
import authStore from '../../store/AuthStore'

export default function AuthPage() {

    const message = useMessage()

    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'',
        password: ''
    })

    useEffect(() => {
        // localStorage.clear()
        // message(error)
        // clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }
    
    const loginHandler = async (event) => {
        event.preventDefault()
        authStore.login(form)
    }

    return(
        <PageTemplate>
            <Title>Sign in</Title>
            <form style={{width: '300px'}} onSubmit={loginHandler}>
                <InputField required>
                    <InputLabel style={{textAlign: 'left'}}>E-mail</InputLabel>
                    <Input placeholder='Input e-mail'
                        id="email" 
                        type="text" 
                        name="email"
                        onChange={changeHandler}
                    />
                </InputField>
                <InputField required>
                    <InputLabel style={{textAlign: 'left'}}>Password</InputLabel>
                    <Input placeholder='Input password'
                        id="password"
                        type="password" 
                        name="password"
                        onChange={changeHandler}
                    />
                </InputField>
                <InputField>
                    <BlueButton fluid color='blue' type='submit'>Sign in</BlueButton>
                </InputField>
            </form>
            <Link href='/'>Return to main page</Link>
        </PageTemplate>
    )
}