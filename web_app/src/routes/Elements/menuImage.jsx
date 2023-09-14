import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MenuImage({ id }) {
  const [isZoomed, setIsZoomed] = useState(false);

  let menu;
  let restaurantName;

  if (id == 1) {
    menu = "http://localhost:6060/images/mexikanaMenu1.jpg";
    restaurantName = "Mexikana";
  } else if (id == 2) {
    menu = "http://localhost:6060/images/laoesteMenu1.jpg";
    restaurantName = "Laoeste";
  } else if (id == 3) {
    menu = "http://localhost:6060/images/bambooleafMenu1.jpg";
    restaurantName = "Bambooleaf";
  } else {
    firstMenu = "...";
    secondMenu = "...";
    restaurantName = "Unavailable";
  }

  const toggleToZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      <div className="row">
        <h3 className="word">{restaurantName} Menu</h3>
        <hr style={{borderTop: "3px solid white"}}/>
      </div>
      <div className="row">
        <img
          src={menu}
          className={`rounded ${isZoomed ? "zoomed" : ""} `}
          alt={menu}
          onClick={toggleToZoom}
        ></img>
      </div>
    </>
  );
}

export default MenuImage;
