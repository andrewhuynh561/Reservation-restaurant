import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './routes/Home.jsx'
import About from './routes/About.jsx'
import Login from './routes/Login.jsx'
import Booking from './routes/Booking.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="row" style={{backgroundColor: 'white'}}>
          <img src="http://localhost:6060/images/logo.png" className="topleft col-1" alt="FunDev"></img>
          <nav className="mb-4 col-10">
            <Link to="/">Home</Link> |
            <Link to="/about"> About SGV</Link> |
            <Link to="/login"> Login</Link>
          </nav>
        </div>
        <Routes>
          <Route index                           element={<Home />} />
          <Route path="about"                    element={<About />} />
          <Route path="restaurants/:id/booking/" element={<Booking />} />
          <Route path="login"                    element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
