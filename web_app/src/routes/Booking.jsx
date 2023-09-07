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
  const isDayDisable = (banDate) => {
    const dayOfWeek = banDate.getDay();
    if (id == 1) {
      // Disable Sunday (day 0) Mexikana restaurant
      return dayOfWeek !== 0;
    } else if (id == 2) {
      //Disable Monday (day 1) and Tuesday (day 2) La Oeste De La Mar restaurant
      return dayOfWeek !== 1 && dayOfWeek !== 2;
    } else if (id == 3) {
      //Disable Monday (day 1)  Bambooleaf restaurant
      return dayOfWeek !== 1;
    } else {
      return false;
    }
  };

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

  // date, numberOfGuests, restaurantId, customerId, timeSlotId, banquetId
  const handleSubmit = async (event) => {
    event.preventDefault();
    const reservationData = {
      date: date.toISOString().split('T')[0],
      numberOfGuests: guest,
      restaurantId: id,
      customerId: 1,
      timeSlotId: 1,
      banquetId: banquet,
    };
  
    console.log(reservationData);
  
    try {
      const response = await fetch(`http://localhost:6060/restaurants/${id}/bookings`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to create reservation for restaurant ID ${id}`);
      }
  
      const responseBody = await response.text();
      console.log(responseBody);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="newResForm">
      <div>
        <h2>Reservation for {restaurant.name}</h2>
        <h3>Select the date</h3>
        {/* <DatePicker selected={date} onChange={BookingTime()} /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          filterDate={isDayDisable}
        />
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
