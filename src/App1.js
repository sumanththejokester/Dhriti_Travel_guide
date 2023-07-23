import React from 'react'
import App from './Screens/home/App'
import Login from './Screens/auth/register/Login'
import SplashScreen from './Screens/splashscreen/SplashScreen'
import Register from './Screens/auth/register/Register'
import Bookings from './Screens/Booking/Bookings'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import Profile from './Screens/Profile/Profile'

const App1 = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/Bookings" element={<Bookings />} />
                    <Route path='/home' element={<App />} />
                    <Route path='/Register' element={<Register />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/' element={<SplashScreen />} />
                    <Route path='/Profile' element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default App1