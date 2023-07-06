import React, { useState, useContext } from "react";
import "../styles/userdashbord.css";
import AuthContext from "../Context/AuthContext";
import "../styles/MyBooking.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  let [flightno, setFlightNo] = useState("");
  let [time, setTime] = useState("");
  let [bookings, setBookings] = useState([]);
  const { authToken, logout, user } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleSearch = async () => {
    let url = "";
    if (flightno !== "") {
      url += `flightno=${flightno}&`;
      setFlightNo("");
    }
    if (time !== "") {
      url += `time=${time}`;
      setTime("");
    }

    let response = await fetch(
      `http://127.0.0.1:8000/get-flight-for-admin/?${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
      }
    );

    let data = await response.json();
    setBookings(data);
  };
  return (
    !user ? navigate('/welcomePage') :
    <div>
      <div className="navbar">
        <div
          onClick={(e) => {
            navigate("/adminDash");
          }}
          className="navbar-brand font-albertsans text-3xl cursor-pointer"
        >
          Fly-High
        </div>
        <ul className="navbar-links cursor-pointer">
          <li>
            <a
              onClick={() => {
                navigate("/addFlight");
              }}
              target="_blank"
            >
              AddFlight
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/removeFlight");
              }}
              target="_blank"
            >
              RemoveFlight
            </a>
          </li>
        </ul>
        <div
          className="cursor-pointer text-2xl"
          onClick={(e) => logout()}
          target="_blank"
        >
          Logout
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Flight Number"
          className="inputfields"
          value={flightno}
          onChange={(e) => setFlightNo(e.target.value)}
        />
        <input
          type="time"
          placeholder="Time"
          className="inputfields"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="booking-details-list mt-5">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <p className="booking-info">
              <span className="booking-label">Flight No:</span>{" "}
              {booking.flight_id}
            </p>
            <p className="booking-info">
              <span className="booking-label">Origin:</span>{" "}
              {booking.origin_city}, {booking.origin_country}
            </p>
            <p className="booking-info">
              <span className="booking-label">Destination:</span>{" "}
              {booking.destination_city}, {booking.destination_country}
            </p>
            <p className="booking-info">
              <span className="booking-label">Departure Date:</span>{" "}
              {booking.departure_date}
            </p>
            <p className="booking-info">
              <span className="booking-label">Departure Time:</span>{" "}
              {booking.departure_time}
            </p>
            <p className="booking-info">
              <span className="booking-label">Price:</span> {booking.price}
            </p>
            <p className="booking-info">
              <span className="booking-label">Passenger:</span>{" "}
              {booking.passenger}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
