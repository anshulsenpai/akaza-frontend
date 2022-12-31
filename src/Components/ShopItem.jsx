import React from 'react'
import styled from 'styled-components'
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { addProduct } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { notify } from '../notification/Toastify';
import { BASE_URL } from '../ReqMethods';

const ShopItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
            addProduct({ ...item })
        );
    };

    return (
        <Wrapper>
            <Image src={`${BASE_URL}/images/` + item.image} />
            <Title>{item.title}</Title>
            <InfoContainer>
                <Price> <span>Rs.</span> {item.price}</Price>
                <Rating>
                    {Array(item.rating).fill().map((_, i) => <StarIcon key={i} style={{ color: "#9c27b0", fontSize: "14px" }} />)}
                </Rating>
            </InfoContainer>
            <OptionContainer>
                <ShoppingCartOutlinedIcon onClick={() => {handleClick(); notify("Added to cart")}} className="option-icon buy-cart" />
            </OptionContainer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: white;
    width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
    margin: 1rem 0;
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.3);
`

const Image = styled.img`
    display: block;
    width: 100%;
    height: 280px;
    cursor: pointer;
`

const Title = styled.p`
    width: 100%;
    height: 3.5rem;
    padding: 10px;
    font-size: 15px;
    overflow: hidden;
    cursor: pointer;
`

const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center
`

const Price = styled.p`
    padding: 10px;
    width: 100%;
    font-size: 14px;
    font-weight: 600;

    span {
        font-size: 12px;
        font-weight: 400;
    }
`
const Rating = styled.p`
    padding: 10px;
    width: 100%;
`

const OptionContainer = styled.div`
    padding: 10px;
    width: 100%;
    height: 3rem;
    border-top: 0.5px solid darkgray;
    display: flex;
    gap: 1rem;
`


export default ShopItem