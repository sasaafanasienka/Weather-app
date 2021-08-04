import { useEffect, useState } from "react"
import PageTemplate from "../../components/PageTemplate/PageTemplate"
import { useAuth } from "../../hooks/auth.hook"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import {useHistory} from 'react-router-dom'
import Title from "../../components/styled/text/Title"
import Input from "../../components/styled/inputs/Input"
import InputLabel from "../../components/styled/inputs/InputLabel"
import InputField from "../../components/styled/inputs/InputField"
import BlueButton from "../../components/styled/buttons/BlueButton"
import Link from "../../components/styled/links/Link"

export default function RegPage() {

    const message = useMessage()

    const {login, logout} = useAuth()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'',
        password: ''
    })

    // useEffect(() => {
    //     message(error)
    //     clearError()
    // }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }
    
    const registerHandler = async (event) => {
        event.preventDefault()
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }
    
    return(
        <PageTemplate>
            <Title>Sign up</Title>
            <form style={{width: '300px'}} onSubmit={registerHandler}>
                <InputField required>
                    <InputLabel style={{textAlign: 'left'}}>Name</InputLabel>
                    <Input placeholder='Name'
                        id="name" 
                        type="text" 
                        name="name"
                        onChange={changeHandler}
                    />
                </InputField>
                <InputField required>
                    <InputLabel style={{textAlign: 'left'}}>Surname</InputLabel>
                    <Input placeholder='Surname'
                        id="surname" 
                        type="text" 
                        name="surname"
                        onChange={changeHandler}
                    />
                </InputField>
                <InputField required>
                    <InputLabel style={{textAlign: 'left'}}>E-mail</InputLabel>
                    <Input placeholder='E-mail'
                        id="email" 
                        type="text" 
                        name="email"
                        onChange={changeHandler}
                    />
                </InputField>
                <InputField required>
                    <InputLabel style={{textAlign: 'left'}}>Password</InputLabel>
                    <Input placeholder='Password'
                        id="password"
                        type="password" 
                        name="password"
                        onChange={changeHandler}
                    />
                </InputField>
                <InputField>
                    <BlueButton fluid color='blue' type='submit'>Sign up</BlueButton>
                </InputField>
            </form>
            <Link href='/'>Return to main page</Link>
        </PageTemplate>
    )
}