import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Dashboard.css'

function Dashboard() {
    document.body.id = 'H';
    const navigate = useNavigate();
    const localizer = dayjsLocalizer(dayjs)
    
    const { id } = useParams();
    const [employee, setEmployee] = useState({restaurantID: 1});
    const [bookings, setBookings] = useState([]);
    const [formattedBookings, setFBookings] = useState([]);

    console.log(history.state.usr);


    useEffect(() => {
        if(history.state.usr === undefined) {
            console.log("got here");
            navigate(`/`);
        }
    }, [history.state.usr]);

    useEffect(() => {
        fetch(`http://localhost:6060/employee/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch data for ${id}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setEmployee(data);
          })
          .catch((err) => {
            console.error(err.message);
          });
      }, []);

    useEffect(() => {
        fetch(`http://localhost:6060/restaurants/${employee.restaurantID}/bookings`)
            .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${employee.restaurantID}`);
            }
            return response.json();
            })
            .then((data) => {
            console.log(data);
            setBookings(data);
            })
            .catch((err) => {
            console.error(err.message);
        });
    }, [employee]);

    useEffect(() => {
      var tempArray = [];
      
      if(bookings.length > 0) {
        for (var i = 0; i < bookings.length; i++) {
          var fdate = dayjs(bookings[i].date + bookings[i].timeSlot)

          var tempJSON = {
            start: fdate.toDate(),
            end: fdate.add(30, 'minutes').toDate(),
            title: "Booking for " + bookings[i].numberOfGuests + "\n" + "Banquet: " + bookings[i].banquetID,     
          }

          tempArray.push(tempJSON);
          
        }

        console.log(tempArray);
        setFBookings(tempArray);
      }

    }, [bookings]);
    
    return(
        <>
            <div style={{color: "white"}}>
              <h1>Welcome {employee.name}</h1>
            </div>
            <div className="calendar-container">
              <Calendar
                localizer={localizer}
                events={formattedBookings}
                min={new Date(0, 0, 0, 10, 0, 0)}
                max={new Date(0, 0, 0, 23, 59, 0)}
                step={10}
                startAccessor="start"
                endAccessor="end"

              />
            </div>
        </>
    )
}

export default Dashboard