import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './routes/Home.jsx'
import Booking from './routes/Booking.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="row">
          <img src="http://localhost:6060/images/logo.png" className="topleft col-1" alt="FunDev"></img>
          <nav className="mb-4 col-10">
            <Link to="/">Home</Link>
          </nav>
        </div>
        <Routes>
          <Route index          element={<Home />} />
          <Route path="restaurants/:id/booking/" element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
