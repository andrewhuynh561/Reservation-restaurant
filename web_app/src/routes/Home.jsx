import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './Home.css'

function Home() {
  document.body.id = 'H';

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
      
      <div className="row card-holder" id="fade-in-home">
        {restaurants.map((item, index) => (
          
            <div className="col-4" style={{minWidth: 20 +'rem'}} key={item.restaurantID} > 
              <Link to={`/restaurants/${item.restaurantID}/`} className='link-unstyled'>
                <div key={item.restaurantID} className="card mt-4" >
                  <img className="card-img-top restaurant-image" src={`http://localhost:6060/images/${item.image}`} alt={item.name}></img>
                  <div className="card-body">
                    <h3 className="card-title">{item.name.toUpperCase()}</h3>
                    <div className="card-text">
                      <i><p>{item.description}</p></i>
                      <p>{item.address}</p> 
                      <p>{item.openDate}</p> 
                      <p>{item.openHours}</p> 
                      <p>{item.cuisine}</p> 
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          

          
          
        ))}
        <hr style={{marginTop: 20}}/>
      </div>     
      <p className="read-the-docs slogan-style" id="fade-in-home">
        Grab Life By The Fork
      </p>
    </>
  )
}

export default Home
