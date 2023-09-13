import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Dashboard() {
    document.body.id = 'H';
    const navigate = useNavigate();
    
    const { id } = useParams();
    const [employee, setEmployee] = useState({restaurantID: 1});
    const [bookings, setBookings] = useState([]);

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
    
    return(
        <>
            <p>{id}</p>
        </>
    )

}

export default Dashboard