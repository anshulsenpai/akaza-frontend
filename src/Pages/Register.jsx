import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { publicRequest } from '../ReqMethods'
import { useState } from 'react'
import { notify } from '../notification/Toastify'


const Register = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const res = await publicRequest.post('/auth/register', userDetails)
            if(res.data.errors) {
                notify("⚠️ Enter valid email and password")
            }else {
                notify("Registration Success")
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <Wrapper>
                <LoginOptions>
                    <Link className='login--options' to='/login'>Login</Link>
                    <Link style={{ color: "#9c27b0" }} className='login--options' to='/register'>Register</Link>
                </LoginOptions>
                <Form>
                    <Input placeholder='Full name' type='text' required='required' onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} />

                    <Input placeholder='Username' type='text' required='required' onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />

                    <Input placeholder='Email' type='email' required='required' onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />

                    <Input placeholder='Password' type='password' required='required' onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />

                    {/* <Input placeholder='Confirm password' type='password' required='required' onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} /> */}
                    <Agreement>
                        <Input style={{ width: "20px" }} type='checkbox' required='required' />
                        <AgreementText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, magni.</AgreementText>
                    </Agreement>
                    <Button type='submit' onClick={(e) => handleRegister(e)}>Register</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    @media screen and (max-width: 768px) {
        height: fit-content;
        margin-bottom: 2rem;
    }
`

const Wrapper = styled.div`
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    width: 40%;
    padding: 1rem;
    height: fit-content;

    @media screen and (max-width: 768px) {
        width: 90%;
    }
`

const LoginOptions = styled.div`
    color: white;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    a {
        flex: 1;
        text-align: center;
        text-transform: uppercase;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1rem;
`

const Input = styled.input`
    padding: 15px 22px;
    background-color: rgba(255, 255, 255, 0.05);
    border: none;
    outline: none;
    color: white;
    font-size: 16px;
    font-weight: 200;
    border-radius: 5px;
`

const Button = styled.button`
    border: none;
    background-color: #9c27b0;
    padding: 10px 20px;
    color: white;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: #821496;
    }
`
const Agreement = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`
const AgreementText = styled.p`
    font-size: 12px;
    color: white;
    font-weight: 200;
`

export default Register