import React, { useState } from 'react'
import styled from 'styled-components'
// import game1 from '../Assets/game1.webp'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
// import { GameData } from '../Data/Data';
import { useSelector, useDispatch } from 'react-redux'
import {clearCart, decreaseQuantity, increaseQuantity, removeProduct } from '../redux/cartSlice'
import StripeCheckout from 'react-stripe-checkout'
import game5 from '../Assets/game5.webp'
import { useEffect } from 'react';
import { BASE_URL, userRequest } from '../ReqMethods';
import { useNavigate } from "react-router-dom";
import { notify } from '../notification/Toastify';

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart)
  // console.log("cart =>", cart)
  const subtotal = cart.total
  const cartQuantity = cart.quantity
  const { products } = cart
  const [stripeToken, setStripeToken] = useState(null)
  const navigate = useNavigate();
  const KEY = process.env.REACT_APP_STRIPE;

  // removeProduct
  const handleDelete = (item) => {
    dispatch(
      removeProduct(item)
    )
  }

  const handleClearCart = () => {
    dispatch(
      clearCart()
    )
  }

  // stripe integration - - - - ----->> 
  const onToken = (token) => {
    setStripeToken(token);
  };


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/payments', {
          tokenId: stripeToken.id,
          amount: subtotal * 100,
        })
        console.log(res)
        navigate('/success');
      } catch (error) {
        console.log(error)
        notify('You lost your money! hahaa')
      }
    }
    stripeToken && makeRequest();
  }, [stripeToken, subtotal, navigate])

  const handleDecrease = (item) => {
    dispatch(
      decreaseQuantity(item)
    )
  }
  const handleIncrease = (item) => {
    dispatch(
      increaseQuantity(item)
    )
  }

  return (
    <Container>
      <Title>Your Shopping Cart</Title>
      <Wrapper>
        <Left>
          {
            !cartQuantity && <Title style={{ fontSize: "15px" }}>Your Cart is Empty</Title>
          }
          {
            products?.map(item => (
              <ItemContainer key={item._id}>
                <Image src={`${BASE_URL}/images/` + item.image} />
                <ItemInfo>
                  <ItemTitle>{item.title}.</ItemTitle>
                  <Price>Rs. {item.price}</Price>
                </ItemInfo>
                <Quantity>
                  <RemoveIcon onClick={() => handleDecrease(item)} />
                  <ItemCount>{item.quantity}</ItemCount>
                  <AddIcon onClick={() => handleIncrease(item)}/>
                </Quantity>
                <RemoveItem>
                  <DeleteIcon onClick={() => { handleDelete(item); notify("Item Removed"); }} />
                </RemoveItem>
              </ItemContainer>
            ))
          }
          {
            cartQuantity && <ClearButton onClick={()=>handleClearCart()}>Clear</ClearButton>
          }
        </Left>
        <Right>
          <Summary>
            <SummaryTitle>
              Order Summary
            </SummaryTitle>
            <SummaryInfo>
              <SummaryDetail>
                <Text>Total items in your cart</Text>
                <Text>{cartQuantity}</Text>
              </SummaryDetail>
              <SummaryDetail>
                <Text>Subtotal</Text>
                <Text> {subtotal}</Text>
              </SummaryDetail>
              {cart.products.length > 0 && <SummaryDetail>
                <Text>Shipping Charges</Text>
                <Text> 40</Text>
              </SummaryDetail>}
              {
                cart.products.length > 0 && <SummaryDetail>
                  <Text>Discount</Text>
                  <Text> -40</Text>
                </SummaryDetail>
              }
              <SummaryDetail style={{ marginTop: "1.2rem" }}>
                <Text style={{ fontWeight: "500", fontSize: "20px" }}>Total</Text>
                <Text style={{ fontWeight: "500", fontSize: "20px" }}>Rs. {subtotal}</Text>
              </SummaryDetail>
            </SummaryInfo>
            {/* <Button>Checkout</Button> */}
            <StripeCheckout
              name="PlayStation Games Shop"
              image={game5}
              shippingAddress
              billingAddress
              description={`Your total is Rs.${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT</Button>
            </StripeCheckout>
          </Summary>
        </Right>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
    height: 100vh;

    @media screen and (max-width: 768px) {
      height: fit-content;
    }
`

const Title = styled.h2`
  color: #e2e2e2;
  font-weight: 200;
  font-size: 28px;
  margin: 10px 0;
  text-align: center;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  gap: 1rem;
  margin: 1rem 0;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const Left = styled.div`
  width: 100%;
  flex: 6;
  height: 88vh;
  overflow: scroll;
  &::-webkit-scrollbar {
  display: none;
}
`

const ItemContainer = styled.div`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;

  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`

const Image = styled.img`
  width: 100px;

  @media screen and (max-width: 768px) {
    width: 80px;
  }
`

const ClearButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background-color: #9c27b0;
  text-align: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  margin: 3rem auto;
`

const ItemInfo = styled.div`
  margin: 0 10px;
  /* border: 1px solid red; */
  width: 60%;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`

const ItemTitle = styled.p`
  color: white;
  font-weight: 300;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }

`

const Price = styled.p`
  font-size: 20px;
  font-weight: 300;
  color: white;
  /* margin: 10px 0; */

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`

const Quantity = styled.div`
  padding: 1px 5px;
  border-radius: 5px;
  display: flex;
  width: 80px;
  background-color: #9c27b0;
  align-items: center;
  justify-content: space-between;

  > * {
    color: white;
    font-weight: 600;
    font-size: 12px;
  }

  @media screen and (max-width: 768px) {
    width: 60px;
    margin: 0 10px;
  }
`

const ItemCount = styled.p`
  width: 100%;
  text-align: center;

  @media screen and (max-width: 768px) {
    width: 15px;
  }
`

const RemoveItem = styled.div`
  > * {
    color: white;
  }
`

const Right = styled.div`
  flex: 4;
  background-color: #81dbff;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`

const Summary = styled.div`
  display: flex;
  flex-direction: column;
`

const SummaryTitle = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  color: white;
`

const SummaryInfo = styled.div`
  width: 100%;
  border: 1px solid #303030;
  padding: 10px 10px;
  margin-top: 1rem;
  border-radius: 10px;
`

const SummaryDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin: 10px 0;
`

const Text = styled.p`
  color: white;
  font-weight: 200;
`

const Button = styled.button`
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 500;
  margin: 1rem 0;
  border: none;
  color: white;
  background-color: #9c27b0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #7c108f;
  }
`

export default Cart