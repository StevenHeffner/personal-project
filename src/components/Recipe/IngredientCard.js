import React, { Component } from "react";
import Fraction from "fraction.js";

class IngredientsCard extends Component {
  render() {
    let { img, item, measurement, quantity } = this.props.ingredient;
    let x = new Fraction(+quantity);
    let res = x.toFraction(true);

    return (
      <div className="ingredient-card">
        {/* <img className="ingredint-img" src={img} /> */}
        <div
          style={{
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            flexShrink: 0,
            backgroundPosition: "center",
            height: 50,
            width: 50,
            backgroundImage: `url(${img})`
          }}
        />
        <div className="ingredint-body">
          <div className="text t">{item}</div>
          <div className="quantity-measurement">
            <div className="text quantity">{res}</div>
            <div className="text">{measurement}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default IngredientsCard;
