import { Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import UserRoutes from './routes/UserRoutes';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import ConfirmResetPassword from './components/ConfirmResetPassword';
import ProductOverview from './components/ProductOverview';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSummery from './components/OrderSummery';
import { Suspense, lazy } from 'react';
import Footer from './components/Footer';
import PaymentSuccess from './components/PaymentSuccess';
import WomenSection from './components/WomenSection';
import MenSection from './components/MenSection';

// const HomePage = lazy(() => import('./components/HomePage'));
// const LoginPage = lazy(() => import('./components/LoginPage'));
// const RegistrationPage = lazy(() => import('./components/RegistrationPage'));
// const ResetPasswordPage = lazy(() => import('./components/ResetPasswordPage'));
// const ConfirmResetPassword = lazy(() => import('./components/ConfirmResetPassword'));
// const ProductOverview = lazy(() => import('./components/ProductOverview'));
// const Cart = lazy(() => import('./components/Cart'));
// const Checkout = lazy(() => import('./components/Checkout'));
// const OrderSummery = lazy(() => import('./components/OrderSummery'));


function App() {
  
  return (
    <>
      <div>
        <div className='fixed top-0 left-0 right-0 z-10 mb-14'>
          <Navbar />
        </div>
        <div className='mt-14'>
         <Suspense fallback={<div className='flex justify-center font-extrabold text-2xl'>Loading...</div>}>
            <Routes>
                      <Route path='/' element={<HomePage />}  />
                      <Route path='/login' element={<LoginPage />}  />
                      <Route path='/register' element={<RegistrationPage />}  />
                      <Route path='/resetPassword' element={<ResetPasswordPage />} />
                      <Route path='/usr/confirmReset' element={<ConfirmResetPassword />}  />
                      <Route path='/productOverview/:id' element={<ProductOverview />} />
                      <Route path='/cart' element={<Cart />} />      
                      <Route path='/cart/checkout' element={<Checkout />} /> 
                      <Route path='/order/checkout' element={<OrderSummery />}  />  
                      <Route path='/payment' element={<PaymentSuccess />}  />
                      <Route path='/womenShoes' element={<WomenSection />}  />
                      <Route path='/menShoes' element={<MenSection />}  />    
                      {/* <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product />}  /> 
                      <Route path='/product/:productId' element={<ProductDetails />}  />
                      <Route path='/checkout' element={<Checkout />}  />
                      <Route path='/account/order' element={<Order />}  />
                      <Route path='/account/order/:orderId' element={<OrderDetails />}  /> */}
            
            </Routes>
          </Suspense>
        </div>
        <div className=''>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
