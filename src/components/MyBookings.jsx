import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import "../styles/MyBooking.css";
import "../styles/userdashbord.css";


const MyBookings = () => {
    let [bookings, setBookings] = useState([])
    const {authToken, logout} = useContext(AuthContext)
    useEffect(() => {
        getBookedFlights()
    },[])

    const getBookedFlights = async () =>{
        let response = await fetch("http://127.0.0.1:8000/get-user-booked-tickets/", {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${authToken.refresh}`,
                'Access-Control-Allow-Origin': '*'
            }
        })
        let data = await response.json()
        console.log(data);
        setBookings(data)
    }
  return (
    !user ? navigate('/welcomePage') :
    <div>
        <div className="navbar mb-4">
            <div onClick={(e) => {navigate("/")}} className="navbar-brand font-albertsans text-3xl">Fly-High</div>
            <ul className="navbar-links cursor-pointer">
            <li>
                <a classname="cursor-pointer" onClick={() => {navigate('/myBookings')}} target="_blank">MyBookings</a>
            </li>
            <div className="cursor-pointer text-2xl" onClick={(e)=>logout()} target="_blank">Logout</div>
            </ul>
        </div>
        <div className="booking-details-list">
            <h3 className='text-3xl mb-4'>Booking Details</h3>
            {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                <p className="booking-info">
                    <span className="booking-label">Flight No:</span> {booking.flight_id}
                </p>
                <p className="booking-info">
                    <span className="booking-label">Origin:</span> {booking.origin_city}, {booking.origin_country}
                </p>
                <p className="booking-info">
                    <span className="booking-label">Destination:</span> {booking.destination_city}, {booking.destination_country}
                </p>
                <p className="booking-info">
                    <span className="booking-label">Departure Date:</span> {booking.departure_date}
                </p>
                <p className="booking-info">
                    <span className="booking-label">Departure Time:</span> {booking.departure_time}
                </p>
                <p className="booking-info">
                    <span className="booking-label">Price:</span> {booking.price}
                </p>
                <p className="booking-info">
                    <span className="booking-label">Passenger:</span> {booking.passenger}
                </p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyBookings