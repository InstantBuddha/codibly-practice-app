import React from 'react'

 function ProductCard(props) {
  return (
    <div>
        <h1>{props.productName} | {props.id}</h1>
    </div>
  )
}

export default ProductCard