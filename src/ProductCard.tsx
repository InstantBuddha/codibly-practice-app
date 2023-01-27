import React from "react";

function ProductCard(props) {
  return (
    <div className="productCard" style={{ backgroundColor: props.color }}>
      <div>{props.id !== 99 && props.id}</div>
      <div>{props.productName}</div>
      <div>{props.year}</div>
    </div>
  );
}

export default ProductCard;
