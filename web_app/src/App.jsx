import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import Login from './routes/Login.jsx'
import Booking from './routes/Booking.jsx'
import Restaurant from "./routes/Restaurant.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className=" row" >
          <nav className="nav-menu mb-4 col-12 ">
            <Link to="/">Home</Link> 
            <Link to="/about"> About SGV</Link> 
            <Link className="login" to="/login"> Login</Link>
          </nav>
          
        </div>
        <Routes>
          <Route index                           element={<Home />} />
          <Route path="about"                    element={<About />} />
          <Route path="restaurants/:id/booking/" element={<Booking />} />
          <Route path="login"                    element={<Login />} />
          <Route path="restaurants/:id/"         element={<Restaurant />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
