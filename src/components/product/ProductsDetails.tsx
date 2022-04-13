import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/product.context";
import { Product } from "../../utils/interfaces/product.interface";
import ProductDeleteDialog from "./actions/ProductDeleteDialog";
import ProductEditDialog from "./actions/ProductEditDialog";
import ProductDetails from "./details/ProductDetails";

import "../../Styles/Product/Product.css";
import ProductImageList from "./ProductImageList";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getSingleProduct } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoProductsFound from "./NoProductsFound";

export default function ProductsDetails() {
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

  return (
    <section className="product">
      <div className="product-meta-data">
        <div className="data">
          <h2>{loadedProduct.title}</h2>
          <h4>{loadedProduct.brand}</h4>
          <small>{loadedProduct.description}</small>
          <ProductImageList images={loadedProduct.images} />
        </div>
        <div className="thumbnail">
          <img src={loadedProduct.thumbnail} alt={loadedProduct.title} />
        </div>
      </div>
      <ProductDetails rows={loadedProduct} />
      <div className="product-actions">
        <ProductEditDialog
          productName={loadedProduct.title}
          productPrice={loadedProduct.price}
          productDescription={loadedProduct.description}
          submitAction={() => {}}
        />
        <ProductDeleteDialog
          productName={loadedProduct.title}
          submitAction={() => {}}
        />
      </div>
    </section>
  );
}
