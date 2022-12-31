import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ShopItem from '../Components/ShopItem'
import { useLocation } from 'react-router-dom'
import { publicRequest } from '../ReqMethods'
import SearchIcon from '@mui/icons-material/Search';

const Shop = () => {
    const cat = useLocation().search.split('=')[1]
    const [category, setCategory] = useState({});
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const handleFilter = (e) => {
        const value = e.target.value

        if (!(value === 'All categories')) {
            setCategory({
                [e.target.name]: value
            })
        } else {
            setFilteredData(data)
        }
    }

    // Make API call for Porducts
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(cat ? `/products?category=${cat}` : `/products`)
                const productData = res.data
                setData(productData)
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [cat])

    useEffect(() => {
        setFilteredData(data.filter(item => Object.entries(category).every(([key, value]) => item[key].includes(value))))
    }, [data, category])

    let categories = []
    data.map(item => categories.push(item.category))
    const categorySet = new Set(categories)
    categories = [...categorySet]


    // handle search 

    const handleSearch = (e) => {
        setSearchData(data.filter(item => item.title.toLowerCase().includes(e)) || data.filter(item => item.category.toLowerCase().includes(e)))
        setFilteredData(searchData)
    }

    return (
        <ShopContainer>
            <HeadText>Top New Games</HeadText>
            <Category>
                <SelectCategory name="category" onChange={handleFilter}>
                    <Option desabled >All categories</Option>
                    {
                        categories?.map((item, i) => <Option key={i} >{item}</Option>)
                    }
                </SelectCategory>
                <SearchWrapper>
                    <input type="text" placeholder='Search' onChange={(e) => handleSearch(e.target.value)} />
                    <SearchIcon className='icon search--icon' />
                </SearchWrapper>
            </Category>
            <Container>
                {
                    filteredData?.map(item => <ShopItem key={item._id} item={item} />)
                }
            </Container>
        </ShopContainer>
    )
}

const ShopContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    @media screen and (max-width: 768px) {
        min-height: 100vh;
    }
`



const Container = styled.div`
    padding: 2rem;
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
       
    }
`
const HeadText = styled.p`
    font-size: 24px;
    color: darkgrey;
    font-weight: 300;
    margin-top: 1rem;
    text-align: center;
`
const Category = styled.div`
    display: flex;
    width: 100%;
    padding: 1rem;
    align-items: center;
    justify-content: space-around;
    @media screen and (max-width : 768px){
        /* flex-wrap: wrap; */
        justify-content: center;
        gap: 1rem;
    }
`

const SelectCategory = styled.select`
    padding: 12px 16px;
    font-size: 15px;
    outline: none;
    transition: all 0.3s ease;
    border: 1px solid #555555;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #cecece;

`


const Option = styled.option`
    padding: 10px 20px;
    font-size: 15px;
    margin: 5px;
    background-color: black;
`

const SearchWrapper = styled.div`
    display: flex;
    border: 1px solid #555555;
    border-radius: 6px;
    padding: 8px 18px;
    background-color: rgba(255, 255, 255, 0.1);
    align-items: center;
    justify-content: space-between;

    input {
      outline: none;
      border: none;
      padding: 5px 16px;
      background-color: transparent;
      color: #cecece;
      font-size: 15px;
    }

    @media screen and (max-width : 768px) {
        input {
            width: 100px;
        }
    }
`
export default Shop