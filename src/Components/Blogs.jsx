import React from 'react'
import styled from 'styled-components'
import Blog from './Blog'
import { BlogData } from '../Data/Data'

const Blogs = () => {
    return (
        <Container>
            <Wrapper>
                <HeadText>Blogs</HeadText>
                <BlogsContainer>
                    {
                        BlogData?.map(item => (
                            <Blog key={item.id} item={item} />
                        ))
                    }
                </BlogsContainer>
            </Wrapper>
        </Container>
    )
}

const Container = styled.section`
    width: 100%;
    padding: 20px;
    @media screen and (max-width: 768px)  {
        padding: 5px;
    }
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 10px;
    @media screen and (max-width: 768px)  {
        padding: 5px;
    }
`

const HeadText = styled.h2`
    color: #cccccc;
    font-size: 32px;
    letter-spacing: 2px;
    font-weight: 200;
    margin: 15px 0;
    @media screen and (max-width: 768px)  {
        font-size: 26px;
        margin: 10px 0;
    }
`

const BlogsContainer = styled.div`
    height: 100vh;
    width: 100%;
    /* border: 1px solid #452484; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5rem;
    margin: 3rem 0;
    height: 100%;
`

export default Blogs