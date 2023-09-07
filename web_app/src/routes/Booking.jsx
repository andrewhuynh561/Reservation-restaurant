import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DigitalClock } from "@mui/x-date-pickers";

function Booking() {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFDate] = useState('2023-09-07');
  const [timeSlots, setTimeSlots] = useState([]);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState("");
  const [banquet, setBanquet] = useState("");

  // Updates the time when user changes times on selection 
  const handleChangeinTimes = (newTime) => {
    setTime(newTime)
  }

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

  useEffect(() => {
    fetch(`http://localhost:6060/timeSlots/${id}/${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // this should be the same as the line below but it isn't
        setTimeSlots(data);
        console.log(timeSlots); // why does this give different answer to the one above
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, formattedDate]);

  // date, numberOfGuests, restaurantId, customerId, timeSlotId, banquetId
  const handleSubmit = async (event) => {

  // const handleSubmit = (event) => {
    event.preventDefault();
    const reservationData = {
      date: date.toISOString().split('T')[0],
      numberOfGuests: guest,
      restaurantId: id,
      customerId: 1,
      timeSlotId: 1 ,
      banquetId: banquet,
     };
  
     console.log(reservationData);
  
     try {
       const response = fetch(`http://localhost:6060/restaurants/${id}/bookings`, {
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
  
       const responseBody = response.text();
       console.log(responseBody);
     } catch (error) {
       console.error(error);
     }
   };
  

  const handleDateChange = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'may', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    setDate(date);
    console.log(date);
    const dateArray = date.toDateString().split(" ");
    let month = 0;
    for (let i = 0; i < 12; i++){
      if(dateArray[1] == months[i])
      month = (i + 1);
      month = month.toString().padStart(2, '0');
    }
    const fDate = dateArray[3] + '-' + month + '-' + dateArray[2];
    console.log(fDate);
    setFDate(fDate);
  }

  const shouldDisableTime = (value, view) => { 
    let visible = true;
    for (let i = 0; i < timeSlots.length; i++){
      let temp = timeSlots[i];
      temp = temp.timeSlot.split(":")
      if(value.hour() == temp[0] && value.minute() == temp[1]){
        visible = false;
        break;
      }
    }
    
    console.log(value, visible);
    return view = visible;    
  }

  return (
    <form onSubmit={handleSubmit} className="newResForm">
      <div>
        <h2>Reservation for {restaurant.name}</h2>
        <h3>Select the date</h3>
        {/* <DatePicker selected={date} onChange={BookingTime()} /> */}
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          filterDate={isDayDisable}
        />
        <p>Selected date: {date.toDateString()}</p>

        <h3>Select the time</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DigitalClock style={{width: 100}} timeStep={30} shouldDisableTime={shouldDisableTime} onChange={handleChangeinTimes} disablePast/>
        </LocalizationProvider>
        <p>Selected Time: {time && time.format("hh:mm A")}</p> {/* there to see if the time is updated and displayed */}
        
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
        <br /> 
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


export default Booking;
