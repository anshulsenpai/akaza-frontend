import React from 'react'
import styled from 'styled-components'
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Announcement from './Announcement';

const Footer = () => {
    return (
        <>
            <Announcement />
            <FooterContainer>
                <Left>
                    <Logo>AKAZA.</Logo>
                    <Region>Country / Region : India</Region>
                    <SocialLinks>
                        <YouTubeIcon className='icon' />
                        <InstagramIcon className='icon' />
                        <TwitterIcon className='icon' />
                    </SocialLinks>
                </Left>
                <Right>
                    <FooterLink>Support</FooterLink>
                    <FooterLink>Privacy and cookies</FooterLink>
                    <FooterLink>Website terms of use</FooterLink>
                    <FooterLink>PlayStation Studios</FooterLink>
                    <FooterLink>Legal</FooterLink>
                    <FooterLink>About SIE</FooterLink>
                    <FooterLink>PlayStation and the environment</FooterLink>
                </Right>
            </FooterContainer>
        </>
    )
}

const FooterContainer = styled.footer`
    color: white;
    background-color: #100F0F;
    padding: 1rem 2rem;
    display: flex;
    height: 40vh;

    @media screen and (max-width: 768px)  {
        padding: 10px;
        min-height: 200px;
        margin-top: auto;
    }
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`

const Logo = styled.h2`
    font-weight: 700;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
`

const Region = styled.p`
    color: grey;
    font-weight: 400;
    font-size: 14px;

    @media screen and (max-width: 768px)  {
        font-size: 10px;
    }
`


const SocialLinks = styled.a`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 2rem 0;
    cursor: pointer;
    
    &>*:hover {
        transition: all 0.3s ease;
        color: #9c27b0;
    }
`


const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


const FooterLink = styled.a`
    color: grey;
    font-size: 15px;
    text-decoration: none;
    transition: all 0.3s ease;
    margin-top: 5px;
    cursor: pointer;
    width: 80%;
    &:hover {
        color: #9c27b0;
    }

    @media screen and (max-width: 768px)  {
        font-size: 10px;
    }
`

export default Footer