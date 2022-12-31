import React from 'react'
import styled from 'styled-components'

const Announcement = () => {
  return (
    <Container>
        Designed and Developed by Anshul Kulkarni
    </Container>
  )
}

// Container div = = = = =>

const Container = styled.div`
    height: 30px;
    background-color: #9c27b0;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 600;

    @media screen and (max-width: 768px){
      font-size: 10px;
      font-weight: 400;
    }
`

export default Announcement