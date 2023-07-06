import React from 'react'
import "../App.css";
import { useNavigate } from 'react-router-dom';
const WelcomePage = () => {
    const Navigate = useNavigate()
  return (
    <div className='container'>
        <div className='intro-container'>
            <p className='text-6xl font-albertsans text-[#F6F1F1]'>Fly-<span className='text-[#F1C376]'>high</span> </p>
            <p className='text-2xl font-albertsans text-[#F6F1F1]'>Embark on your dream adventure. Experience hassle-free flight bookings, real-time availability, and exclusive deals through our user-friendly flight booking system.</p>
            <div className='btns font-albertsans'>
                <button className='btn text-[#FC4F00] font-bold text-2xl' onClick={() => {Navigate("/userLogin")}}>User</button>
                <button className='btn text-[#FC4F00] font-bold text-2xl' onClick={() => {Navigate("/adminLogin")}}>Admin</button>
            </div>
        </div>
    </div>
  )
}

export default WelcomePage