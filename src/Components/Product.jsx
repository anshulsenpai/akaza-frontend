import { useSelector } from "react-redux"
import styled from "styled-components"

const Product = () => {
  const product = useSelector(state => state.product)
  console.log("product comp => ", product)
  return (
    <Container>
    </Container>
  )
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    background: linear-gradient( 120deg,#000b1a, #000000);
`

export default Product