import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DigitalClock } from "@mui/x-date-pickers";

function Booking() {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [timeslot, setTimeslot] = useState(null);
  const [guest, setGuest] = useState("");
  const [banquet, setBanquet] = useState("");

  // Updates the time when user changes times on selection 
  const handleChangeinTimes = (newTimeslot) => {
    setTimeslot(newTimeslot)
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
    const formattedDate = date.toISOString().split('T')[0]

    fetch(`http://localhost:6060/timeSlots/${id}/${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        setTimeSlots([...data]);
        // The timeslot variable does not change straight away: https://stackoverflow.com/questions/61254964/react-array-of-objects-usestate-from-fetch-call-assignment
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, date]);

  // date, numberOfGuests, restaurantId, customerId, timeSlotId, banquetId
  const handleSubmit = async (event) => {
    event.preventDefault();
    const reservationData = {
      date: date.toISOString().split('T')[0],
      numberOfGuests: guest,
      restaurantId: id,
      customerId: null,
      timeSlotId: timeslot.timeSlotID,
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
       console.log("Post response", responseBody);
     } catch (error) {
       console.error(error);
     }
   };
  

  const handleDateChange = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    setDate(date);
  }

  return (
    <>
    <div className="row g-2 justify-content-md-center">
      <div className="col-4">
        <h2>For menu and restaurant space </h2>
      </div>
      <div className="col-6">
        <form onSubmit={handleSubmit} className="newResForm">
          <div>
            <h2>Reservation for {restaurant.name}</h2>
            <h3>Select the date</h3>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              filterDate={isDayDisable}
              dateFormat="dd/MM/yyyy"
            />
            <p>Selected date: {date.toDateString()}</p>

            <h3>Select the time</h3>
            {
              timeSlots.map((timeslot)=> {
                const onclickEvent = () => {
                  handleChangeinTimes(timeslot)
                };

                return (
                  <button
                    type="button"
                    key={timeslot.timeSlotID}
                    onClick={onclickEvent}
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      border: '1px solid black',
                      transition: 'background-color 0.3s, color 0.3s', 
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'blue';
                      e.target.style.color = 'white'; 
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white'; 
                      e.target.style.color = 'black'; 
                    }}
                  >
                    {timeslot.timeSlot}
                  </button>
                );
                
              })
            }
            <p>Selected Time: {timeslot && timeslot.timeSlot}</p> {/* there to see if the time is updated and displayed */}
            
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
              className="reservation-btn"
              type="submit"
              
            >
              Booking<span></span>
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}


export default Booking;
