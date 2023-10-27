import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const userSlice = useSelector((state) => state);
    const { isFetching } = userSlice.user
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password }, navigate);
    };

    return (
        <Container>
            <Wrapper>
                <LoginOptions>
                    <Link style={{ color: "#9c27b0" }} className='login--options' to='/login'>Login</Link>
                    <Link className='login--options' to='/register'>Register</Link>
                </LoginOptions>
                <Form>
                    <Input placeholder='Username' type='text' required='required' onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder='Password' type='password' required='required' onChange={(e) => setPassword(e.target.value)} />
                    <Button type='submit' onClick={handleClick} disabled={isFetching}>Log in</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 60vh;
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
    &:disabled {
    color: green;
    cursor: not-allowed;
  }
`

export default Login