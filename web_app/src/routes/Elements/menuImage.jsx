import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MenuImage({ id }) {
  let firstMenu;
  let secondMenu;
  let restaurantName;

  if (id == 1) {
    firstMenu = "http://localhost:6060/images/mexikanaMenu1.jpg";
    secondMenu = "http://localhost:6060/images/mexikanaMenu2.jpg";
    restaurantName = "Mexikana";
  } else if (id == 2) {
    firstMenu = "http://localhost:6060/images/laoesteMenu1.jpg";
    secondMenu = "http://localhost:6060/images/laoesteMenu2.jpg";
    restaurantName = "Laoeste";
  } else if (id == 3) {
    firstMenu = "http://localhost:6060/images/bambooleafMenu1.jpg";
    secondMenu = "http://localhost:6060/images/bambooleafMenu2.jpg";
    restaurantName = "Bambooleaf";
  } else {
    firstMenu = "...";
    secondMenu = "...";
    restaurantName = "Unavailable";
  }

  return (
    <>
      <div className="row">
        <h3>{restaurantName} Menu</h3>
      </div>
      <div className="row">
        <img src={firstMenu} className="rounded" alt={firstMenu}></img>
        <img src={secondMenu} className="rounded" alt={secondMenu}></img>
      </div>
    </>
  );
}

export default MenuImage;
