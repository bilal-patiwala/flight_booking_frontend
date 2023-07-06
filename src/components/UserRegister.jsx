import React, { useContext, useState } from 'react'
import styles from "../styles/signup.module.css";
import "../App.css";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from '../Context/AuthContext';
const UserRegister = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let navigate = useNavigate()
    let {signupUser,user} = useContext(AuthContext)
    
    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }
    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    const confirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value)
    }

    const signupFormHandler = (event) => {
        if(username != '' && email!='' && password != '' && confirmPassword != ''){
            if(password === confirmPassword){
                signupUser(event)
            }
            else{
                alert("password not matched")
            }
        }
        else{
            alert("Enter credetials")
        }
    }

  return (
    user ? <Navigate to="/"/> :
    <div className='grid justify-center items-center h-screen'>
        <div className={styles['making-shadow']}>
            <div className='flex-row space-y-4'>
                <p className='text-6xl text-center mt-5 font-albertsans text-black'>Fly-<span className='text-[#F1C376]'>high</span> </p>
                <div className='flex-row bg-white p-10 w-96 rounded-md'>
                    <h3 className='text-center text-2xl mb-6'>Register</h3>
                    <form className='flex flex-col space-y-6 mb-6' onSubmit={signupFormHandler}>
                        <input type='text' placeholder="Username" name='username' value={username} className="bg-[#DDE6ED] p-2 border-b focus:outline-none rounded" onChange={usernameHandler} />
                        <input type='Email' placeholder="Email" name="email" value={email} className="bg-[#DDE6ED] p-2 border-b focus:outline-none rounded" onChange={emailHandler} />
                        <input type='password' placeholder="Password" name='password' value={password} className="bg-[#DDE6ED] p-2 border-b focus:outline-none rounded" onChange={passwordHandler} />
                        <input type='password' placeholder="Confirm Password" name='confirmpassword' className="bg-[#DDE6ED] p-2 border-b focus:outline-none rounded" value={confirmPassword} onChange={confirmPasswordHandler}/>
                        <button type="submit" className={styles['signup-btn']}>Sign-Up</button>
                    </form>
                    <a className="cursor-pointer" onClick={(event) => {navigate('/userRegister')}} target="_blank">have an account? <span className="text-[#FC4F00]">Login</span></a>
                </div>
            </div>`
        </div>
        
    </div>
  )

}

export default UserRegister