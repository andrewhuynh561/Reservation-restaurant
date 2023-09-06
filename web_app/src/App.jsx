import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './routes/Home.jsx'
import Booking from './routes/Booking.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route index          element={<Home />} />
          <Route path="restaurants/:id/booking/" element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
