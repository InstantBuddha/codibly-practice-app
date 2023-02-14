import React from "react";
import { Product } from "./App";

type ProductCardProps = {
  key: number;
  productData: Product;
};

function ProductCard(props: ProductCardProps) {
  return (
    <div
      className="productCard"
      style={{ backgroundColor: props.productData.color }}
    >
      <div>{props.productData.id !== 99 && props.productData.id}</div>
      <div>{props.productData.name}</div>
      <div>{props.productData.year}</div>
    </div>
  );
}

export default React.memo(ProductCard);
