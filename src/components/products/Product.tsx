import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getSingleProduct } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoProductsFound from "./NoProductsFound";
import ProductDetailSection from "./ProductDetailSection";

import "../../Styles/Product/Product.css";

export default function Product() {
  const params = useParams();
  const { productId } = params;

  const {
    sendRequest,
    status,
    data: loadedProduct,
    error,
  } = useHttp(getSingleProduct, true);

  useEffect(() => {
    sendRequest(productId);
  }, [sendRequest, productId]);

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

  if (status === "completed" && !loadedProduct.title) {
    return <NoProductsFound plural={true} />;
  }

  return <ProductDetailSection product={loadedProduct} />;
}
