<<<<<<< HEAD
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
import EditProfile from "./routes/EditProfile.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const value = {loggedIn, setLoggedIn};

  const [initials, setInitials] = useState(null);
  const [open, setOpen] = useState(false);
  const [showProfileIcon, setSPI] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        //console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  useEffect(() => {
    if(loggedIn != null) {
      
      if(loggedIn.customer) {
        fetch(`http://localhost:6060/customer/${loggedIn.accountID}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch customer data for account ID: ${loggedIn.accountID}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.customerID);
          var temp = data.name.split(" ");
          var initials = temp[0][0] + temp[temp.length - 1][0];
          console.log(initials);
          setInitials(initials);
        })
        .catch((err) => {
          console.error(err.message);
        });
      }
      else {
        fetch(`http://localhost:6060/employee/${loggedIn.accountID}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch data for ${loggedIn.accountID}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.employeeID);
            var temp = data.name.split(" ");
            var initials = temp[0][0] + temp[temp.length - 1][0];
            console.log(initials);
            setInitials(initials);
          })
          .catch((err) => {
            console.error(err.message);
          });
      }
      
      
    }    
  }, [loggedIn]);

  function LoginButtons() {
    if (loggedIn !== null) {
      setSPI(true);
    }
    else {
      setSPI(false);

      return (
        <>
          <a href="/login" className="btn btn-success login-button-align" title="Log in to your account" type="button">Login</a>
          <a href="/signup" className="btn btn-warning signup-button" title="Create an account with us" type="button">Sign up</a>
        </>
      )
    }
  }

  return (
    <>
      <BrowserRouter>
        <LoginContext.Provider value={value}>
          <div className=" row" >
            <nav className="nav-menu col-12 ">

            <div className='menu-container' ref={menuRef}>
              <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                <div className={`profile-icon ${showProfileIcon? 'active' : 'inactive'}`}>
                  <h5 className="profile-initials">{initials}</h5>
                </div>
              </div>

              <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} key={1}>
                <ul>
                  <DropdownItem text = {"My Profile"}/>
                  <DropdownItem text = {"Edit Profile"}/>
                  <DropdownItem text = {"Settings"}/>
                  <DropdownItem text = {"Helps"}/>
                  <DropdownItem text = {"Logout"}/>
                </ul>
              </div>
            </div>
                  
              <LoginButtons />
              
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
            <Route path="account/:id/editprofile/"           element={<EditProfile />} />
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
=======
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
import EditProfile from "./routes/EditProfile.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const value = {loggedIn, setLoggedIn};

  const [initials, setInitials] = useState(null);
  const [open, setOpen] = useState(false);
  const [showProfileIcon, setSPI] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        //console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  useEffect(() => {
    if(loggedIn != null) {
      
      if(loggedIn.customer) {
        fetch(`http://localhost:6060/customer/${loggedIn.accountID}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch customer data for account ID: ${loggedIn.accountID}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.customerID);
          var temp = data.name.split(" ");
          var initials = temp[0][0] + temp[temp.length - 1][0];
          console.log(initials);
          setInitials(initials);
        })
        .catch((err) => {
          console.error(err.message);
        });
      }
      else {
        fetch(`http://localhost:6060/employee/${loggedIn.accountID}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch data for ${loggedIn.accountID}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.employeeID);
            var temp = data.name.split(" ");
            var initials = temp[0][0] + temp[temp.length - 1][0];
            console.log(initials);
            setInitials(initials);
          })
          .catch((err) => {
            console.error(err.message);
          });
      }
      
      
    }    
  }, [loggedIn]);

  function LoginButtons() {
    if (loggedIn !== null) {
      setSPI(true);
    }
    else {
      setSPI(false);

      return (
        <>
          <a href="/login" className="btn btn-success login-button-align" title="Log in to your account" type="button">Login</a>
          <a href="/signup" className="btn btn-warning signup-button" title="Create an account with us" type="button">Sign up</a>
        </>
      )
    }
  }

  return (
    <>
      <BrowserRouter>
        <LoginContext.Provider value={value}>
          <div className=" row" >
            <nav className="nav-menu col-12 ">

            <div className='menu-container' ref={menuRef}>
              <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                <div className={`profile-icon ${showProfileIcon? 'active' : 'inactive'}`}>
                  <h5 className="profile-initials">{initials}</h5>
                </div>
              </div>

              <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} key={1}>
                <ul>
                  <DropdownItem text = {"My Profile"}/>
                  <DropdownItem text = {"Edit Profile"}/>
                  <DropdownItem text = {"Settings"}/>
                  <DropdownItem text = {"Helps"}/>
                  <DropdownItem text = {"Logout"}/>
                </ul>
              </div>
            </div>
                  
              <LoginButtons />
              
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
>>>>>>> 541ed4442b124d345840e2a4895c925adc0c7d3a
