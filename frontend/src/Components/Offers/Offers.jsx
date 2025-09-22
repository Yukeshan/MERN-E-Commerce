import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Mega Sale</h1>
        <h1>Extrafashionza!</h1>

        <p>
          Unbeatable discounts on a wide range of collections during our Mega Sale
          Extrafashionza!
        </p>
        <button>Up to 50% Off</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;
