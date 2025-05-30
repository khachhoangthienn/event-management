import React from 'react'
import Home from './page/Home'
import Event from './page/Event'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EventDetails from './page/EventDetails'
import Login from './page/Login'
import PricingPlan from './page/PricingPlan'
import About from './page/About'
import Contact from './page/Contact'
import Profile from './page/Profile'
import { ToastContainer } from 'react-toastify'
import VnPayCallback from './page/VnPayCallback'
import Chatbot from './components/Chatbot'
import StripeCallback from './components/StripeCallBack'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/events' element={<Event />} />
        <Route path='/events/:eventId' element={<EventDetails />} />
        <Route path='/events/:eventId/pricing-plan' element={<PricingPlan />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/payment/vn-pay-callback' element={<VnPayCallback />} />
        <Route path="/payment/stripe-pay-callback" element={<StripeCallback />} />
      </Routes>
      <Footer />
      <ToastContainer />
      <Chatbot />
    </div>
  )
}

export default App