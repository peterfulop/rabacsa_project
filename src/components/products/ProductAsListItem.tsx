import { Product } from "../../utils/interfaces/product.interface";
import ProductAsCardItem from "./ProductAsCardItem";

import "../../Styles/Product/ProductList.css";

export default function ProductAsListItem(props: { product: Product }) {
  return (
    <div className="product-list-item">
      <div className="product-list-meta-data">
        <div className="product-image">
          <img src={props.product.thumbnail} alt={props.product.title} />
        </div>
        <div className="product-list-data">
          <h4>{props.product.title}</h4>
          <p>{props.product.rating}</p>
          <small>{props.product.description}</small>
        </div>
      </div>
      <div className="product-list-actions">
        <h2>${props.product.price}</h2>
        <ProductAsCardItem product={props.product} />
      </div>
    </div>
  );
}
