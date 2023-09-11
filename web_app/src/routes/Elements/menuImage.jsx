import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MenuImage() {
  return (
    <>
      <div className="row">
        <h3>Menu</h3>
      </div>
      <div className="row">
        <img
          src="http://localhost:6060/images/bambooleafMenu1.jpg"
          className="rounded"
          alt="..."
        ></img>
      </div>
    </>
  );
}

export default MenuImage;
