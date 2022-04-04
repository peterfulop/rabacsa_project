import { createContext } from "react";
import productsJson from "../data/products.json";
import { Product } from "../interfaces/product.interface";

const ProductContext = createContext<Product[]>([]);

export function ProductContextProvider(props: { children?: React.ReactNode }) {
  console.log("ReadData...");

  let products: Product[] = productsJson.products.map(
    (product: any) => product as Product
  );
  return (
    <ProductContext.Provider value={[...products]}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
