import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from './Layout.jsx'
import Home from './routes/Home.jsx'
import Booking from './routes/Booking.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index          element={<Home />} />
            <Route path="/booking/" element={<Booking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
