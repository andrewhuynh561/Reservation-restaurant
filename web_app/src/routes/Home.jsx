import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

function Home() {
  const [count, setCount] = useState(0);

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6060/restaurants/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRestaurants(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>

      <div className="row">
        {restaurants.map((item, index) => (
          
            <div className="col-4" style={{minWidth: 20 +'rem'}} >

              <div key={item.restaurantID} className="card mt-4" >
              <img className="card-img-top" src={`http://localhost:6060/images/${item.image}`} style={{height: "240px", objectFit: "cover"}} alt={item.name}></img>
              <div className="card-body">
                <h3 className="card-title">{item.name.toUpperCase()}</h3>
                <div className="card-text">
                  <i><p>{item.description}</p></i>
                  <p>{item.address}</p> 
                  <p>{item.openDate}</p> 
                  <p>{item.openHours}</p> 
                  <p>{item.cuisine}</p> 
                </div>
                <Link to={`/restaurants/${item.restaurantID}/booking/`} className="btn btn-primary">BOOK</Link>
              </div>
              </div>
            </div>
           

          
          
        ))}
      </div>

      <hr />
      <p className="read-the-docs">
        Secure a sitting fast without the need to create an account
      </p>
    </>
  )
}

export default Home
