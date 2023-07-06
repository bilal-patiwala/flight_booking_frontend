import React, {useContext, useState} from 'react'
import "../styles/addflight.css";
import "../styles/userdashbord.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
const RemoveFlight = () => {
    const { authToken, logout, user } = useContext(AuthContext);
    let [flightno, setFlightNo] = useState('')
    let [flight, setFlight] = useState([])
  const navigate = useNavigate()

  const handleSearch = async () => {
    let url = "";
    if (flightno !== "") {
      url += `flightno=${flightno}&`;
      setFlightNo("");
    }

    let response = await fetch(
      `http://127.0.0.1:8000/get-single-flight/?${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
      }
    );

    let data = await response.json();
    setFlight(data);
  };

  const deleteFlight = async (id) => {
    let response = await fetch(`http://127.0.0.1:8000/delete-flight/${id}`, {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            'Access-Control-Allow-Origin': '*'
        }
    })
    let data = await response.json()
    navigate("/removeFlight")
  }

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
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="flight-list mt-4">
        {flight.length!=0 ? (<div className="flight-card" key={flight.id}>
                <h3>
                    {flight.origin_city}, {flight.origin_country} to {flight.destination_city}, {flight.destination_country}
                </h3>
                <p>
                    Departure Date: {flight.departure_date}, Departure Time: {flight.departure_time}
                </p>
                <p>Price: {flight.price}</p>
                <p>Total Seats Left: {flight.total_seats_left}</p>
                <button className="book-button" onClick={() => deleteFlight(flight.id)}>
                    delete
                </button>
                <hr className="divider" />
                </div>) : null}
                
        </div>
    </div>
  )
}

export default RemoveFlight