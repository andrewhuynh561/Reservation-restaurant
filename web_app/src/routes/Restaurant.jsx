import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// Mexikana images 
import Mexikana1 from './.././images/mexikana/Aug-18.jpg';
import Mexikana2 from './.././images/mexikana/chicken-fried-hot-pot-with-spicy-sauce-korean-style.jpg';
import Mexikana3 from './.././images/mexikana/R.jpg';
import Mexikana4 from './.././images/mexikana/spaghetti-tomato-sauce-with-bell-pepper-chicken.jpg';
import Mexikana5 from './.././images/mexikana/top-view-chinese-hot-pot.jpg';
import Mexikana6 from './.././images/mexikana/view-delicious-tacos-plate.jpg';

// La Oeste De La Mar images 
import Laoeste1 from './.././images/laoeste/closeup-shot-restaurant-menu-set-black-plates-perfect-food-background.jpg';
import Laoeste2 from './.././images/laoeste/delicious-food-assortment-flat-lay.jpg';
import Laoeste3 from './.././images/laoeste/flat-lay-assortment-with-delicious-brazilian-food.jpg';
import Laoeste4 from './.././images/laoeste/fresh-grilled-beef-steak-with-vegetable-salad-generative-ai.jpg';
import Laoeste5 from './.././images/laoeste/hands-holding-bowl-fajita-mexican-food.jpg';
import Laoeste6 from './.././images/laoeste/top-view-delicious-brazilian-food-composition.jpg';

// Bambooleaf images 
import Bambooleaf1 from './.././images/bambooleaf/pexels-chan-walrus-958545.jpg';
import Bambooleaf2 from './.././images/bambooleaf/pexels-geraud-pfeiffer-6605195.jpg';
import Bambooleaf3 from './.././images/bambooleaf/pexels-jer-chung-2792186.jpg';
import Bambooleaf4 from './.././images/bambooleaf/pexels-leonardo-luz-15024300.jpg';
import Bambooleaf5 from './.././images/bambooleaf/pexels-momo-king-5409015.jpg';
import Bambooleaf6 from './.././images/bambooleaf/pexels-roman-odintsov-4552045.jpg';

function Restaurant() {
  const [restaurant, setRestaurant] = useState([]);
  const { id } = useParams(); //link from homepage will pass restaurant id to this page


  const gallery = (id) => 
  {
    if (id == 1)
    {
      return [
        {
          original: Mexikana1 ,
          thumbnail: Mexikana1 ,
        },
        {
          original: Mexikana2 ,
          thumbnail: Mexikana2 ,
        },
        {
          original: Mexikana3 ,
          thumbnail:Mexikana3 ,
        },
        {
          original: Mexikana4 ,
          thumbnail: Mexikana4 ,
        },
        {
          original: Mexikana5 ,
          thumbnail: Mexikana5 ,
        },
        {
          original: Mexikana6 ,
          thumbnail: Mexikana6 ,
        }
      ];
    }
    else if (id == 2)
    {
      return [
        {
          original: Laoeste1,
          thumbnail: Laoeste1,
        },
        {
          original: Laoeste2,
          thumbnail: Laoeste2,
        },
        {
          original: Laoeste3,
          thumbnail: Laoeste3,
        },
        {
          original: Laoeste4,
          thumbnail: Laoeste4,
        },
        {
          original: Laoeste5,
          thumbnail: Laoeste5,
        },
        {
          original: Laoeste6,
          thumbnail: Laoeste6,
        }
      ];
    }
    else if (id == 3)
    {
      return [
        {
          original: Bambooleaf1 ,
          thumbnail: Bambooleaf1 ,
        },
        {
          original: Bambooleaf2 ,
          thumbnail: Bambooleaf2 ,
        },
        {
          original: Bambooleaf3 ,
          thumbnail: Bambooleaf3 ,
        },
        {
          original: Bambooleaf4 ,
          thumbnail: Bambooleaf4 ,
        },
        {
          original: Bambooleaf5,
          thumbnail: Bambooleaf5 ,
        },
        {
          original: Bambooleaf6 ,
          thumbnail: Bambooleaf6 ,
        }
      ];
    }
  }


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
  
 

  const description = (id) => {
    let script = "";
    if (id == 1) {
      return (script +=
        "Discover the ultimate fusion of Korean and Mexican flavors at our trendy restaurant," +
        " tailored for hipsters seeking an eclectic dining experience. Our menu combines the best of both cuisines," +
        " served in a vibrant atmosphere adorned with graffiti art—a culinary adventure that's as unique as it is delicious");
    } else if (id == 2) {
      return (script +=
        "Journey to Brazil without leaving Adelaide." +
        " Our vibrant restaurant in the heart of the city brings the spirit of Brazil to your plate, offering a mouthwatering fusion of flavors that will transport you to the heart of South America.");
    } else if (id == 3) {
      return (script +=
        "Experience the essence of Asia" +
        " with a modern twist at our restaurant in the heart of Adelaide. Our fusion cuisine combines traditional flavors with contemporary flair. Discover a diverse menu," +
        "artful presentation, and a warm ambiance that promises a memorable dining experience");
    }
  };

  return (
    <>
      <div className="jumbotron py-1 my-2 alert-secondary">
        <h1 className="text-center">{restaurant.name}</h1>
      </div>
      <div className="row">
        <div className="col text-center">
          <p style={{ fontStyle: "italic", color: "grey" }}>
            {description(id)}
          </p>
        </div>
      </div>

      <ImageGallery slideInterval={4000} slideDuration={1000} autoPlay={true} showBullets={true} showPlayButton={false} showFullscreenButton={false} items={gallery(id)}></ImageGallery>
      
      <Link to={`/restaurants/${restaurant.restaurantID}/booking/`} className="btn btn-primary">BOOK</Link>
      <p>All Images we use just for education only.</p>
    </>
  );
}

export default Restaurant;
