import React, { useContext, useState } from "react";
import styles from "../styles/login.module.css";
import "../App.css";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState(0)
  let navigate = useNavigate()
  let {flight_admin_login, user} = useContext(AuthContext)
  
  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }
  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const loginFormSubmit = async (event) => {
    if (username != "" && password!=""){
      let response = await flight_admin_login(event)
      if (response.status === 401){
        setErrormsg(response.status)
      }
    }
  }

  return (
    user ? <Navigate to="/adminDash"/> :
    <div className="grid justify-center items-center h-screen">
        <div className={styles['making-shadow']}>
            <div className="flex-column space-y-4">
                <p className='text-6xl text-center mt-5 font-albertsans text-black'>Fly-<span className='text-[#F1C376]'>high</span> </p>
                <div className="flex-row bg-white p-10 rounded-md">
                    <h3 className="text-2xl text-center mb-6">Admin Login</h3>
                    <form className="flex flex-col space-y-6 mb-6" onSubmit={loginFormSubmit}>
                        <input type='text' name="username" placeholder="Username" value={username} className="bg-[#DDE6ED] p-2 border-b focus:outline-none rounded" onChange={usernameHandler} required/>
                        <input type='Password'name="password" placeholder="Password" className="bg-[#DDE6ED] p-2 border-b focus:outline-none rounded" value={password} onChange={passwordHandler} required minLength={6}/>
                        <button type="submit" className={styles['login-btn']}>Login</button>
                        {errormsg === 401 ? (<p className="text-[#ff0000]">Invalid Username or Password</p>) : null}
                    </form>
                    
                </div>
            </div>
        </div>
        
    </div>
  );
};

export default AdminLogin;