import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Restaurant() {
  const [restaurant, setRestaurant] = useState([]);
  const { id } = useParams(); //link from homepage will pass restaurant id to this page

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

  const description = (restaurantID) => {
    const script = "";
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
      <div class="jumbotron py-1 my-2 alert-secondary">
        <h1 class="text-center">Restaurant Name</h1>
      </div>
      <div className="row">
        <div className="col text-center">
          <p style={{ fontStyle: "italic", color: "grey" }}>
            {description(restaurantID)}
          </p>
        </div>
      </div>
      <div className="container gallery-container">
        <div className="row">
          <div className="col-md-4 gallery-item">
            <img src="image1.jpg" alt="Image 1" />
          </div>
          <div className="col-md-4 gallery-item">
            <img src="image2.jpg" alt="Image 2" />
          </div>
          <div className="col-md-4 gallery-item">
            <img src="image3.jpg" alt="Image 3" />
          </div>
          {/* Add more gallery items as needed */}
        </div>
      </div>
    </>
  );
}
