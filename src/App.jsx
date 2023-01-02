import './App.css';
import Announcement from './Components/Announcement';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Product from './Components/Product';
import Home from './Pages/Home';
import { Routes, Route, Navigate } from 'react-router-dom'
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Success from '../src/Pages/Success'
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const user = useSelector(state => state.user)
  const isUser = user.currentUser ? true : false
  // getting API call 

  useEffect(() => {
    axios.get('https://akaza-games-api.onrender.com/products')
  })

  return (
    <div className="app">
      <Announcement />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop/:category' element={<Shop />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/register' element={isUser ? <Navigate to="/" /> : <Register />} />
        <Route path='/login' element={isUser ? <Navigate to="/" /> : <Login />} />
        <Route path='/success' element={<Success />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
