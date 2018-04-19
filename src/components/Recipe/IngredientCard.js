import React, { Component } from "react";

class IngredientsCard extends Component {
  render() {
    let { img, item, measurement, quantity } = this.props.ingredient;
    return (
      <div className="ingredient-card">
        <img className="ingredint-img" src={img} />
        <div className="ingredint-body">
          <div className="text t">{item}</div>
          <div className="quantity-measurement">
            <div className="text quantity">{quantity}</div>
            <div className="text">{measurement}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default IngredientsCard;
