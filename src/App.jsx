import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./utils/PrivateRoute";
import { AuthProvider } from "./Context/AuthContext";
import WelcomePage from "./components/WelcomePage";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import Home from "./components/Home";
import UserRegister from "./components/UserRegister";
import MyBookings from "./components/MyBookings";
import AdminDashboard from "./components/AdminDashboard";
import AddFlight from "./components/AddFlight";
import RemoveFlight from "./components/RemoveFlight";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home/>} />
            </Route>
            <Route path="/welcomepage" element={<WelcomePage/>}/>
            <Route path="/userLogin" element={<UserLogin/>} />
            <Route path="/adminLogin" element={<AdminLogin/>} />
            <Route path="/userRegister" element={<UserRegister/>} />
            <Route path="/myBookings" element={<MyBookings/>} />
            <Route path="/adminDash" element={<AdminDashboard/>} />
            <Route path="/addFlight" element={<AddFlight/>} />
            <Route path="/removeFlight" element={<RemoveFlight/>} />


          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
