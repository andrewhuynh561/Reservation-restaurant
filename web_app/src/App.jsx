import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import Login from './routes/Login.jsx'
import Booking from './routes/Booking.jsx'
import Signup from './routes/Signup.jsx'
import Restaurant from "./routes/Restaurant.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className=" row" >
          <nav className="nav-menu mb-4 col-12 ">
             
            
            <a href="/login" className="btn btn-success login-button-align" title="Log in to your account" type="button">Login</a>
            <a href="/signup" className="btn btn-warning signup-button" title="Create an account with us" type="button">Sign up</a>
            <ul>

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
