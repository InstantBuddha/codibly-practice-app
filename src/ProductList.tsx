import React, { useState } from "react";
import ProductCard from "./ProductCard";

function ProductList(props) {
  const mapDisplayProducts = (productsToMap) => {
    return productsToMap.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        productName={product.name}
        color={product.color}
        year={product.year}
        pantone_value={product.pantone_value}
      />
    ));
  };

  return (
    <div>
      <h1>ProductList</h1>
      <div>{mapDisplayProducts(props.rawList)}</div>
    </div>
  );
}

export default ProductList;
