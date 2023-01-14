import React, { useState } from 'react'
import ProductCard from './ProductCard'

function ProductList(props) {
  //const [ displayList, setDisplayList ] = useState([props.rawList])
  
  const mapDisplayProducts = (productsToMap) => {
    return productsToMap.map((product) => (
        <ProductCard 
            key={product.id}
            id={product.id}
            productName={product.name} />
    ))
  }

  //console.log("props: ", props.rawList)
  return (
    <div><h1>ProductList</h1>
        <div>{ mapDisplayProducts(props.rawList)}</div>
    </div>
  )
}

export default ProductList