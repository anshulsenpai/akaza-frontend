import React, { useState } from 'react'
import styled from 'styled-components'
// import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { logOut } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { notify } from '../notification/Toastify';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false)
    const handleSlideBar = () => {
        setIsActive(!isActive)
    }
    const navigate = useNavigate()

    const quantity = useSelector(state => state.cart.quantity)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const onLogOut = () => {
        dispatch(logOut())
        navigate('/');
    }

    return (
        <Container>
            <Wrapper>
                <Center>
                    <NavLink to='/'><Logo>AKAZA.</Logo></NavLink>
                </Center>
                <Right>
                    <MenuContainer active={isActive ? '0' : '100%'}>
                        <NavLink to='/'><MenuItem onClick={handleSlideBar}>Home</MenuItem></NavLink>
                        <NavLink to='shop'><MenuItem onClick={handleSlideBar}>Shop</MenuItem></NavLink>
                        {!currentUser && <NavLink to='register'><MenuItem onClick={handleSlideBar}>REGISTER</MenuItem></NavLink>}
                        {!currentUser && <NavLink to='login'><MenuItem onClick={handleSlideBar}>LOG IN</MenuItem></NavLink>}
                        {currentUser && <NavLink to='/'><MenuItem onClick={() => {
                            handleSlideBar()
                            onLogOut()
                            notify("Log out successfully")
                        }}>LOG OUT</MenuItem></NavLink>}
                    </MenuContainer>
                    <NavLink to='/cart' >
                        <BadgeContainer>
                            <Badge badgeContent={quantity} color="secondary">
                                <LocalMallOutlinedIcon />
                            </Badge>
                        </BadgeContainer>
                    </NavLink>
                    {
                        currentUser && <User>
                            <p>Welcome</p>
                            <h3>{currentUser.name.toUpperCase().split(" ")[0]}</h3>
                        </User>
                    }
                </Right>
                <MenuBtn onClick={handleSlideBar}>
                    <MenuIcon />
                </MenuBtn>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    height: 60px;
    background-color: rgba(0, 11, 26, 0.8);
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media screen and (max-width: 768px){
        padding: 10px 10px;
        /* flex-direction: column; */
        align-items: initial;
    }
`


// Center div = = = = =>
const Center = styled.div`
    /* flex: 1; */
`

const Logo = styled.h1`
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    color: white;
    cursor: pointer;
    
    @media screen and (max-width: 768px)  {
        font-size: 24px;
    }
`

// Right div = = = = =>
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

`

const MenuContainer = styled.div`
    display: flex;

    @media screen and (max-width: 768px) {
        position: absolute;
        flex-direction: column;
        top: 58px;
        right: 0;
        width: 30%;
        gap: 1rem;
        justify-content: center;
        text-align: center;
        background-color: rgba(0, 11, 26, 0.8);
        padding: 10px;
        transform: translateX(${(props) => props.active});
        transition: all 0.3s ease;
    }
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    color: white;
    transition: all 0.3s ease;
    text-transform: uppercase;

    &>* {
        color: white;
    }

    &:hover {
        color: #9c27b0;
    }

    @media screen and (max-width: 768px) {
        margin-left: 0;
    }

`

const BadgeContainer = styled.div`
    color: white;
    margin-left: 16px;
`

const MenuBtn = styled.div`
    margin-top: 8px;
    margin-left: 10px;
    display: none;
    &>* {
        color: white;
    }

    @media screen and (max-width: 768px) {
        display: block;
    }
`

const User = styled.div`
    color: white;
    font-size: 15px;
    font-weight: 200;
    margin: 0 15px;

    p {
        font-size: 12px;
    }
`

export default Navbar