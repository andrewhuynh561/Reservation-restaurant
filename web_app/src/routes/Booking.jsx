import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from "@mui/x-date-pickers";

function Booking() {
  const [date, setDate] = useState(new Date());
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState("");
  const [banquet, setBanquet] = useState("");

  useEffect(() => {
    fetch(`http://localhost:6060/restaurants/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data for restaurant ID ${id}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRestaurant(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your reservation submission logic here, for example, sending data to the server.
    // You can access selected date, time, and banquet from state variables.
  };

  return (
    <form onSubmit={handleSubmit} className="newResForm">
      <div>
        <h2>Reservation for {restaurant.name}</h2>
        <h3>Select the date</h3>
        <DatePicker selected={date} onChange={BookingTime()} />
        <p>Selected date: {date.toDateString()}</p>

        <h3>Select the time</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker label="Select a time"></TimePicker>
        </LocalizationProvider>
        
        <h3>Select the banquet size</h3>
        <input
          type="text"
          value={banquet}
          onChange={(e) => setBanquet(e.target.value)}
          name="banquet"
        />

        <h4>Select number of guests</h4>
        <input
          name="numberOfGuests"
          type="number"
          min="0"
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
        />
      </div>

      <div className="newResbtn">
        <button
          className="btn submitBtn"
          type="submit"
          style={{ backgroundColor: "green", color: "white" }}
        >
          Submit<span></span>
        </button>
      </div>
    </form>
  );
}

function BookingTime() {
  useEffect(() => {
    fetch(`http://localhost:6060/timeSlots/1/7-09-2023`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
}

export default Booking;
