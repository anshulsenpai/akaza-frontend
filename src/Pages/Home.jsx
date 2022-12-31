import React from 'react'
import Blogs from '../Components/Blogs'
import Slider from '../Components/Slider'
import { useSelector } from 'react-redux';
import { notify } from '../notification/Toastify';


const Home = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    if(currentUser){
        notify("Login Succesfull")
    }

    return (
        <div>
            <Slider />
            <Blogs />
        </div>
    )
}

export default Home