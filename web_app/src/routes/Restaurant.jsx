import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import '../App.css'
import './Restaurant.css'
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

// Showcase Share Banquet (Korean Fried Chicken Tacos) for Mexikana
import showcaseShare from './.././BanquetShowcaseImages/TonyChickenTacos.jpg'

// Showcase Feast Banquet (Crying Tiger Salad) for BambooLeaf
import showcaseFeast from './.././BanquetShowcaseImages/crying-tiger-beef-and-green-papaya-salad-131312-1.jpg'


function Restaurant() {
  document.body.id = 'R';

  const [restaurant, setRestaurant] = useState([]);
  const { id } = useParams(); //link from homepage will pass restaurant id to this page
  const [banquets, setBanquets] = useState([]);

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

  const formatMeals = (str) => {
    let meals = str.split("\n")
    
    return (
      <div style={{marginTop: "-20px"}}>
        {meals.map((meal, index) => (
          <p key={index}><hr/>{meal}</p>
        ))}
      </div>
    );
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
    fetch(`http://localhost:6060/restaurants/${id}/banquets`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data for restaurant ID ${id}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("banquets", data);
        setBanquets(data);
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
    <div className="centered-container">
      <div className="video-background">
      <iframe
            width={1920}
            height={1080}
            src="https://www.youtube.com/embed/lcU3pruVyUw?autoplay=1&rel=0&controls=0&mute=1&loop=1&modestbranding=1&showinfo=0&enablejsapi=1&&widgetid=3"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
      </div>
      <div className="overlay"></div>
      <div className="content">
        <div style={{color: "white"}}>
          <h1 className="text-center" id="fade-in" style={{ fontSize: 100 }}>Welcome to</h1>
          <h1 className="text-center" id="fade-in"  style={{ fontSize: 100 }}>{restaurant.name}</h1>
          <div className="row">
            <div className="des text-center" id="fade-in">
              <p style={{ fontStyle: "italic", color: "lightgrey",fontFamily:"cursive" }}>
                {description(id)}
              </p>
            </div>
          </div>
        </div>
        <Link to={`/restaurants/${restaurant.restaurantID}/booking/`} className="btn btn-primary" >Book a Table</Link>
        <div className="slide" id="fade-in-image">
          <ImageGallery  slideInterval={6000} slideDuration={1000} autoPlay={true} showBullets={true} showNav={false} showPlayButton={false} showFullscreenButton={false} showThumbnails={false} items={gallery(id)}></ImageGallery>
        </div>
          {banquets && banquets.some(banquet => banquet.restaurantID >= 1) && (
          <div>
            <div style={{color: "white"}}>
              <h1 style={{fontSize: 70}}>Banquet Options</h1>
            </div>

            <div className="des">
                <p style={{ fontStyle: "italic", color: "lightgrey",fontFamily:"cursive" }}>
                "Explore our exquisite Banquet Options designed to elevate your special events and celebrations. 
                From elegant venues to tailored menus, we offer a range of customizable packages to suit every occasion. 
                Whether it's an intimate gathering or a grand soirée, our dedicated team ensures a seamless experience from planning to execution. 
                Discover the perfect setting for your next event with our Banquet Options."
                </p>
            </div>

          <div className="row cards" style={{marginTop: "-100px"}}>
            {banquets.map((banquet) => (
              <div className="col-3" style={{minWidth: 18 +'rem'}} key={banquet.banquetID} >
                <div className="card mt-5" key={banquet.banquetID}>
                  {banquet.banquetID == 1 && <img src={showcaseShare}></img>}
                  {banquet.banquetID == 2 && <img src={showcaseShare}></img>}
                  {banquet.banquetID == 3 && <img src={showcaseFeast}></img>}
                  <h5 className="card-title">{banquet.banquetName} {banquet.banquetPrice} <br/>(min {banquet.sittingLimit} people)</h5>
                  <div className="card-body">
                      <div style={{textAlign: "center"}}>
                      <i>{formatMeals(banquet.banquetItems)}</i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
          )}
      </div>
    </div>
      
    </>
    
  );
}

export default Restaurant;
