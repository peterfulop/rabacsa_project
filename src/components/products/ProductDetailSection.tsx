import ProductDeleteDialog from "./actions/ProductDeleteDialog";
import ProductEditDialog from "./actions/ProductEditDialog";
import ProductDetails from "./details/ProductDetails";
import ProductImageList from "./ProductImageList";
import { Product } from "../../utils/interfaces/product.interface";

import "../../Styles/Product/Product.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function ProductDetailSection(props: {
  product: Product;
  neighbourId?: string;
}) {
  const [activeProduct, setActiveProduct] = useState<Product>(props.product);
  const location = useLocation();

  const editProductHandler = (updatedProduct: Product) => {
    setActiveProduct(updatedProduct);
  };

  return (
    <section className="product">
      <div className="product-meta-data">
        <div className="data">
          <h2>{activeProduct.title}</h2>
          <h4>{activeProduct.brand}</h4>
          <small>{activeProduct.description}</small>
          <ProductImageList images={activeProduct.images} />
        </div>
        <div className="thumbnail">
          <img src={activeProduct.thumbnail} alt={activeProduct.title} />
        </div>
      </div>
      <ProductDetails rows={activeProduct} />
      {!location.pathname.includes("/categories/") && (
        <div className="product-actions">
          <ProductEditDialog
            onEditProduct={editProductHandler}
            productId={activeProduct.id}
            productName={activeProduct.title}
            productPrice={activeProduct.price}
            productDescription={activeProduct.description}
          />
          <ProductDeleteDialog
            neighbourId={props.neighbourId}
            productId={activeProduct.id}
            productName={activeProduct.title}
          />
        </div>
      )}
    </section>
  );
}
