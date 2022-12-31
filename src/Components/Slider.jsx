import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { SliderData } from '../Data/Data'

const SliderDataLength = SliderData.length

let count = 0;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const handleArrow = (direction) => {
    if (direction === "back") {
      slideIndex === 0 ? setSlideIndex(SliderDataLength - 1)
        : setSlideIndex(prevIndex => prevIndex - 1)
    } else {
      slideIndex === SliderDataLength - 1 ? setSlideIndex(0)
        : setSlideIndex(prevIndex => prevIndex + 1)
    }
  }

  const handleAutoSlider = () => {
    count = (count + 1) % SliderDataLength;
    setSlideIndex(count)
  }
  
  useEffect(() => {
    setInterval(() => {
      handleAutoSlider()
    }, 6000)
  }, [])

  return (
    <Container>
      <Arrow direction='left' onClick={() => handleArrow('back')}>
        <ArrowBackIosOutlinedIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {
          SliderData?.map(data => (
            <Slide key={data.id}>
              <ImgContainer>
                <Image src={data.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{data.title}</Title>
                <Desc>{data.desc}</Desc>
                <Button>SHOW NOW</Button>
              </InfoContainer>
            </Slide>
          ))
        }
      </Wrapper>
      <Arrow direction='right' onClick={() => handleArrow('next')}>
        <ArrowForwardIosOutlinedIcon />
      </Arrow>
    </Container>
  )
}

// container div = = = = => 
const Container = styled.section`
    width: 100%;
    height: fit-content;
    display: flex;
    position: relative;
    overflow: hidden;
`;


// Arrow div = = = = => 
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(115%);
    }

    @media screen and (max-width: 768px)  {
      width: 30px;
      height: 30px;
    }
`;


// Wrapper div = = = = => 
const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 600ms ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`;


// Slide div = = = = => 
const Slide = styled.div`
  width: 100vw;
  height: fit-content;
  display: flex;
  align-items: center;
  position: relative;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;

  @media screen and (max-width: 768px) {
    height: 286px;

  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 95%;
  object-position: right;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 20px;
  position: absolute;
  left: 10px;

  @media screen and (max-width: 768px) {
    top: 4rem;
    left: 10px;
    padding: 0;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5);

  @media screen and (max-width: 768px) {
    font-size: 2.2rem;
  }

`;

const Desc = styled.p`
  color: white;
  margin: 14px 0px;
  font-size: 16px;
  font-weight: 300;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
  width: 60%;

  @media screen and (max-width: 768px) {
    margin: 0;
    font-size: 10px;
    font-weight: 300;
    width: 80%;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
  }
`;

const Button = styled.button`
  color: white;
  padding: 10px;
  font-size: 16px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid darkgrey;
  transition: all 0.3s ease;


  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin-top: 8px;
    padding: 5px;
  }
`;

export default Slider