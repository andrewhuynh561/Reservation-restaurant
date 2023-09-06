import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
  const [date, setDate] = useState(new Date());
  const { id } = useParams();
  const [restaurants, setRestaurants] = useState([]);

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
        setRestaurants(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [id]);

  return (
    <>
      <div>
        <h2>Reservation for RestaurantID {id}</h2>
        <h3>Select the date</h3>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
        <p>Selected date: {date.toDateString()}</p>
      </div>
    </>
  );
}

export default Booking;
