import React, { useState, useContext } from "react";
import "../styles/addflight.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
const AddFlight = () => {
    const { authToken, logout, user } = useContext(AuthContext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    origin_country: "",
    origin_city: "",
    destination_country: "",
    destination_city: "",
    departure_time: "",
    departure_date: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch('http://127.0.0.1:8000/add-flight/',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    let data = await response.json()
    if(response.status === 201){
        navigate("/adminDash")
    }
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

      <div className="add-flight-form">
        <h3>Add Flight</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Origin Country:
            <input
              type="text"
              name="origin_country"
              required
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            Origin City:
            <input
              type="text"
              name="origin_city"
              required
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            Destination Country:
            <input
              type="text"
              name="destination_country"
              required
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            Destination City:
            <input
              type="text"
              name="destination_city"
              required
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            Departure Time:
            <input
              type="time"
              name="departure_time"
              required
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            Departure Date:
            <input
              type="date"
              name="departure_date"
              required
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              required
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <button type="submit" className="button">Add Flight</button>
        </form>
      </div>
    </div>
  );
};

export default AddFlight;
