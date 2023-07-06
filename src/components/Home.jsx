import React, {useContext, useState} from "react";
import "../styles/userdashbord.css";
import AuthContext from "../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate()
    let [origin, setOrigin] = useState('');
  let [destination, setDestination] = useState('');
  let [date, setDate] = useState('');
  let [time, setTime] = useState('');
  let [flights, setFlights] = useState([])
  const {authToken, logout, user} = useContext(AuthContext)
  const handleSearch = async () => {
    let url = ""
    if(origin!==""){
        url += `origin=${origin}&`
        setOrigin("")
    }
    if(destination!==""){
        url += `&destination=${destination}&`
        setDestination("")
    }
    if(date!==""){
        url += `date=${date}&`
        setDate("")
    }
    if(time!==""){
        url += `time=${time}`
        setTime("")
    }

    console.log(url);
    let response = await fetch(`http://127.0.0.1:8000/get-flight/?${url}`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json"
        }
    })

    let data = await response.json()
    console.log(data);
    setFlights(data)
  };

  const bookFlight = async (flight_id) => {
    let response = await fetch("http://127.0.0.1:8000/book-ticket/", {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${authToken.refresh}`
        },
        body:JSON.stringify({'flight_id':flight_id})
    })
    let data = await response.json()
    console.log(data);

  }


  return (
    !user ? navigate('/welcomePage') :
    <div>
      <div className="navbar">
        <div onClick={(e) => {navigate("/")}} className="navbar-brand font-albertsans text-3xl cursor-pointer">Fly-High</div>
        <ul className="navbar-links cursor-pointer">
          <li>
            <a  onClick={() => {navigate('/myBookings')}} target="_blank">MyBookings</a>
          </li>
        </ul>
        <div className="cursor-pointer text-2xl" onClick={(e)=>logout()} target="_blank">Logout</div>
      </div>
     

      <div className="search-container">
        <input
          type="text"
          placeholder="From"
          className="inputfields"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)
        }
        />
        <input
          type="text"
          placeholder="To"
          className="inputfields"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          className="inputfields"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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

        <div className="flight-list mt-4">
            {flights.map((flight) => (
                <div className="flight-card" key={flight.id}>
                <h3>
                    {flight.origin_city}, {flight.origin_country} to {flight.destination_city}, {flight.destination_country}
                </h3>
                <p>
                    Departure Date: {flight.departure_date}, Departure Time: {flight.departure_time}
                </p>
                <p>Price: {flight.price}</p>
                <p>Total Seats Left: {flight.total_seats_left}</p>
                {flight.total_seats_left>0 ? (<button className="book-button" onClick={() => bookFlight(flight.id)}>
                    Book
                </button>): (<p>"All the tickets are booked"</p>)}
                <hr className="divider" />
                </div>
            ))}
        </div>
    </div>
  );
};

export default Home;
