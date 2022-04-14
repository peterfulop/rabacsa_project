import ProductDeleteDialog from "./actions/ProductDeleteDialog";
import ProductEditDialog from "./actions/ProductEditDialog";
import ProductDetails from "./details/ProductDetails";
import ProductImageList from "./ProductImageList";
import { Product } from "../../utils/interfaces/product.interface";

import "../../Styles/Product/Product.css";
import { useLocation } from "react-router-dom";

export default function ProductDetailSection(props: {
  product: Product;
  neighbourId?: string;
}) {
  const location = useLocation();

  return (
    <section className="product">
      <div className="product-meta-data">
        <div className="data">
          <h2>{props.product.title}</h2>
          <h4>{props.product.brand}</h4>
          <small>{props.product.description}</small>
          <ProductImageList images={props.product.images} />
        </div>
        <div className="thumbnail">
          <img src={props.product.thumbnail} alt={props.product.title} />
        </div>
      </div>
      <ProductDetails rows={props.product} />
      {!location.pathname.includes("/categories/") && (
        <div className="product-actions">
          <ProductEditDialog
            productId={props.product.id}
            productName={props.product.title}
            productPrice={props.product.price}
            productDescription={props.product.description}
          />
          <ProductDeleteDialog
            neighbourId={props.neighbourId}
            productId={props.product.id}
            productName={props.product.title}
          />
        </div>
      )}
    </section>
  );
}
