import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegistrationPage from '../components/RegistrationPage'
import LoginPage from '../components/LoginPage'
import Navbar from '../components/Navbar'
import ResetPasswordPage from '../components/ResetPasswordPage'
import ConfirmResetPassword from '../components/ConfirmResetPassword'
import MainCorousel from '../components/MainCorousel'
import HomePage from '../components/HomePage'
import ProductOverview from '../components/ProductOverview'
import Cart from '../components/Cart'
import Checkout from '../components/Checkout'
import OrderSummery from '../components/OrderSummery'


const UserRoutes = () => {

  return (
    <>
        <div className=''>
          <div className='fixed top-0 left-0 right-0 z-10 mb-14'>
            <Navbar />
          </div>
          <div className='mt-14'>
            <Routes>
                <Route path='/' element={<HomePage />}  />
                <Route path='/login' element={<LoginPage />}  />
                <Route path='/register' element={<RegistrationPage />}  />
                <Route path='/resetPassword' element={<ResetPasswordPage />} />
                <Route path='/usr/confirmReset' element={<ConfirmResetPassword />}  />
                <Route path='/productOverview/:id' element={<ProductOverview />} />
                <Route exact path='/cart' element={<Cart />} />      
                <Route path='/cart/checkout' element={<Checkout />} /> 
                <Route path='/order/checkout?step=3' element={<OrderSummery />}  />      
                {/* <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product />}  /> 
                <Route path='/product/:productId' element={<ProductDetails />}  />
                <Route path='/checkout' element={<Checkout />}  />
                <Route path='/account/order' element={<Order />}  />
                <Route path='/account/order/:orderId' element={<OrderDetails />}  /> */}
              
            </Routes>
          </div>
        </div>    
    </>
  )
}

export default UserRoutes
