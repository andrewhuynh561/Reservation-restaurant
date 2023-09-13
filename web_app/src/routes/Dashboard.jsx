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
      var tempJSON = {
        start: dayjs(),
        end: dayjs().add(30, 'minutes'),
        title: "",
        desc: "",       
      }

      var tempIsoString = "";
      
      if(bookings.length > 0) {
        for (var i = 0; i < bookings.length; i++) {
          tempIsoString = bookings[i].date + 'T'+ bookings[i].timeSlot
          console.log(tempIsoString);
        }
      }

    }, [bookings]);
    
    return(
        <>
            <p>{id}</p>
            <div>
              <Calendar
                localizer={localizer}
                //events={formattedBookings}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
              />
            </div>
        </>
    )

}

export default Dashboard