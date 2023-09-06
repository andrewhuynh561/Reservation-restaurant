import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <div>
        <h3>Select the date</h3>
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>
    </>
  );
}

export default Booking;
