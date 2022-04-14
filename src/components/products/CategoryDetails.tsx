import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../utils/interfaces/product.interface";
import { getAllProducts } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoProductsFound from "./NoProductsFound";
import ProductsList from "./ProductsList";

import "../../Styles/Product/ProductList.css";

export default function CategoryDetails() {
  const params = useParams();
  const {
    sendRequest,
    status,
    data: loadedProducts,
    error,
  } = useHttp(getAllProducts, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (
    status === "completed" &&
    (!loadedProducts || loadedProducts.length === 0)
  ) {
    return <NoProductsFound plural={true} />;
  }

  const getProductsByCategory = () => {
    let products: Product[] = [];

    if (String(params.productCategory).toLowerCase() === "all products") {
      products = loadedProducts;
    } else {
      const productsByCategory = [...loadedProducts].filter(
        (product: Product) => product.category === params.productCategory
      );
      products = productsByCategory;
    }
    return products;
  };

  return (
    <ProductsList
      activeCategory={String(params.productCategory)}
      products={getProductsByCategory()}
    />
  );
}
