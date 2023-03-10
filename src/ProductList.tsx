import { Product } from "./App";
import ProductCard from "./ProductCard";

type ProductListProps = {
  rawList: Product[];
};

function ProductList(props: ProductListProps) {
  const mapDisplayProducts = (productsToMap: Product[]) => {
    return productsToMap.map((product) => (
      <ProductCard key={product.id} productData={product} />
    ));
  };

  return (
    <div>
      <div className="productList">{mapDisplayProducts(props.rawList)}</div>
    </div>
  );
}

export default ProductList;
