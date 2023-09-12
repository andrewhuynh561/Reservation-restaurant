import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import  "./Booking.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DigitalClock } from "@mui/x-date-pickers";
import MenuImage from "./Elements/menuImage";
import "./Booking.css";

function Booking() {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState([]);
  const [timeslot, setTimeslot] = useState(null);
  const [guest, setGuest] = useState("");
  const [banquet, setBanquet] = useState("");
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [reservationID, setReservationID] = useState(0);

  const handleChangeinTimes = (newTimeslot) => {
    setTimeslot(newTimeslot)
  }
  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = (e) => {
    e.preventDefault();
    setConfirmationModalOpen(false);

  };
 

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
    const formattedDate = date.toISOString().split("T")[0];

    fetch(`http://localhost:6060/timeSlots/${id}/${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        setTimeSlots([...data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id, date]);

  // date, numberOfGuests, restaurantId, customerId, timeSlotId, banquetId
  const handleSubmit = async (event) => {
    event.preventDefault();
    const reservationData = {
      date: date.toISOString().split("T")[0],
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
  
       const responseBody = await response.json();
       console.log("id", responseBody.reservationID);
       setReservationID(responseBody.reservationID)
       openConfirmationModal();
     } catch (error) {
       console.error(error);
     }
     

   };
  

  const handleDateChange = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    setDate(date);
  };

  return (
    <div>
      <div className="row g-2 justify-content-md-center">
        <div className="col-4">
          <MenuImage id={id} />
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
              {timeSlots.map((timeslot) => {
                const onclickEvent = () => {
                  handleChangeinTimes(timeslot);
                };

                return (
                  <button
                    type="button"
                    key={timeslot.timeSlotID}
                    onClick={onclickEvent}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid black",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "blue";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                      e.target.style.color = "black";
                    }}
                  >
                    {timeslot.timeSlot}
                  </button>
                );
              })}
              <p>Selected Time: {timeslot && timeslot.timeSlot}</p>{" "}
              {/* there to see if the time is updated and displayed */}
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
          </form>
        </div>
      

      <div className="newResbtn">
        <br /> 
        <button
          className="reservation-btn"
          type="button"
          onClick={handleSubmit}
          
        >
          Booking<span></span>
        </button>
      </div>
      <Modal
        isOpen={isConfirmationModalOpen}
        onRequestClose={closeConfirmationModal}
        contentLabel="Confirmation Modal"
        style={{
          overlay: {
            position: 'fixed',
            zIndex: 1020,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            background:"white",
            width: '45rem',
            maxWidth: 'calc(100vw - 2rem)',
            maxHeight: 'calc(100vh - 2rem)',
            overflowY: 'auto',
            position: 'relative',
            border: '1px solid #ccc',
            borderRadius: '0.3rem',
          }}} 
      >
        <h2>Your reservation has been made</h2><hr />
        <p>Date: {date.toISOString().split('T')[0]}</p>
        <p>Time: {timeslot && timeslot.timeSlot}</p>
        <p>Location : {restaurant.name}</p>
        <p>Customer: None</p>
        <p>Guest :{guest}</p>
        <p>Reservation: {reservationID}</p>
        <button
         className="close-btn"
        onClick={closeConfirmationModal}>Close</button>
      </Modal>
    
    </div>
  </div>
  );
}

export default Booking;
