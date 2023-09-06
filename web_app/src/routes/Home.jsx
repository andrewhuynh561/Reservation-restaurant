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

      <div>
        {restaurants.map((item, index) => (
          <div key={item.restaurantID} className="card">
          <img src={`http://localhost:6060/images/${item.image}`}></img>
          <div class="card-body">
          <h5 class="card-title">{item.name}</h5>
          <p class="card-text">
            <p>{item.description}</p> 
            <p>{item.address}</p> 
            <p>{item.openDate}</p> 
            <p>{item.openHours}</p> 
            <p>{item.cuisine}</p> 
          </p>
          <Link to={`/restaurants/${item.restaurantID}/booking/`} class="btn btn-primary">BOOK</Link>
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
