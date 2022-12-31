import React, { useState } from 'react'
import styled from 'styled-components'

const Blog = ({ item }) => {
    const [showContent, setShowContent] = useState(false)
    return (
        <Container >
            <Wrapper>
                <Image src={item.image} />
                <BlogContent>
                    <Title>{item.title}</Title>
                    <BlogText>{item.main}</BlogText>
                    <BlogText>
                        {showContent ? item.content : null}
                    </BlogText>
                    <Date>
                        AUG 8, 2022
                    </Date>
                    <ReadMore onClick={() => setShowContent(!showContent)}>{showContent ? 'Read Less' 
                    : 'Read More'}</ReadMore>
                </BlogContent>
            </Wrapper>
        </Container>
    )
}

const Container = styled.div`
    cursor: pointer;
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    margin: 0 2rem;
    border-radius: 5px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    @media screen and (max-width: 768px)  {
        width: fit-content;
        height: fit-content;
        margin: 0 10px;
        padding: 10px;
    }
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    gap: 4rem;
    
    @media screen and (max-width: 1200px){
        flex-direction: column;
    }

`

const Image = styled.img`
    width: 50%;
    border-radius: 20px;

    @media screen and (max-width: 1200px){
        width: 100%;

    }

`

const BlogContent = styled.div`
    display: flex;
    padding: 10px 0;
    height: fit-content;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;

`


const Title = styled.h2`
    color: white;
    font-size: 2rem;
    font-weight: 500;

    @media screen and (max-width: 768px)  {
        font-size: 1.5rem;
    }
`

const BlogText = styled.p`
    color: white;
    font-weight: 300;
    color: grey;
`

const Date = styled.p`
    font-size: 15px;
    font-weight: 600;
    color: darkgray;
`

const ReadMore = styled.button`
    padding: 10px 20px;
    background-color: #9c27b0;
    color: white;
    font-size: 14px;
    font-weight: 600;
    width: fit-content;
    border: none;
    border-radius: 5px;
`

export default Blog