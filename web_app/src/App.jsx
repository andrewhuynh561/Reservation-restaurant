import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { createContext, useState, useEffect, useRef } from 'react';
import './App.css'
import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import Login from './routes/Login.jsx'
import Booking from './routes/Booking.jsx'
import Signup from './routes/Signup.jsx'
import Restaurant from "./routes/Restaurant.jsx";
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import LoginContext from "./LoginContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const value = {loggedIn, setLoggedIn};

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <>
      <BrowserRouter>
        <LoginContext.Provider value={value}>
          <div className=" row" >
            <nav className="nav-menu mb-4 col-12 ">

              <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                  <img src='web_app/src/images/bambooleaf/pexels-chan-walrus-958545.jpg'></img>
                </div>

                <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                  <ul>
                    <DropdownItem text = {"My Profile"}/>
                    <DropdownItem text = {"Edit Profile"}/>
                    <DropdownItem text = {"Settings"}/>
                    <DropdownItem text = {"Helps"}/>
                    <DropdownItem text = {"Logout"}/>
                  </ul>
                </div>
              </div>
              
              
              <a href="/login" className="btn btn-success login-button-align" title="Log in to your account" type="button">Login</a>
              <a href="/signup" className="btn btn-warning signup-button" title="Create an account with us" type="button">Sign up</a>
              <ul id="nav-main">

                <li><Link to="/">Home</Link></li>
                <li><Link to="/about"> About SGV</Link></li>
                
                
              </ul>
            </nav>
            
          </div>
          <Routes>
            <Route index                           element={<Home />} />
            <Route path="about"                    element={<About />} />
            <Route path="restaurants/:id/booking/" element={<Booking />} />
            <Route path="login"                    element={<Login />} />
            <Route path="restaurants/:id/"         element={<Restaurant />} />
            <Route path="signup"                   element={<Signup />} />
            <Route path="dashboard/:id/"           element={<Dashboard />} />
            <Route path="account/:id/"           element={<Profile />} />
          </Routes>
        </LoginContext.Provider>
      </BrowserRouter>
    </>
  )
}

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <a> {props.text} </a>
    </li>
  );
}

export default App;
