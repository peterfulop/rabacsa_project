import { useContext, useEffect, useState } from "react";
import ProductContext, {
  ProductContextType,
} from "../../contexts/product.context";
import {
  Product,
  ProductDetails,
} from "../../utils/interfaces/product.interface";
import ProductDeleteDialog from "./actions/ProductDeleteDialog";
import ProductEditDialog from "./actions/ProductEditDialog";
import DetailsTable from "./details/ProductDetails";

import "./Product.css";

export default function ProductItem(props: {
  product: Product;
  products: Product[];
  onUpdateProduct: Function;
  onDeleteProduct: Function;
}) {
  const { updateItem, removeItem } = useContext(
    ProductContext
  ) as ProductContextType;
  const [activeProductId, setActiveProductId] = useState<string>("");

  useEffect(() => {
    setActiveProductId(props.product.id);
  }, [props.product, activeProductId]);

  const editProductHandler = (
    inputTitle: string,
    inputPrice: number,
    inputDescription: string
  ) => {
    updateItem({
      id: activeProductId,
      title: inputTitle,
      price: inputPrice,
      description: inputDescription,
    });

    const updatedProduct: Product = {
      ...props.product,
      title: inputTitle,
      price: inputPrice,
      description: inputDescription,
    };
    props.onUpdateProduct(updatedProduct);
  };

  const deleteProductHandler = () => {
    removeItem(activeProductId);
    const activeProductIndex = props.products.findIndex(
      (prod: Product) => prod.id === activeProductId
    );

    let activeProduct: Product;
    if (activeProductIndex === 0) {
      activeProduct = props.products[activeProductIndex + 1];
    } else {
      activeProduct = props.products[activeProductIndex - 1];
    }
    props.onDeleteProduct(activeProduct);
  };

  const rows: ProductDetails = {
    title: props.product.title,
    brand: props.product.brand,
    category: props.product.category,
    discountPercentage: props.product.discountPercentage,
    price: props.product.price,
    stock: props.product.stock,
    rating: props.product.rating,
    description: props.product.description,
  };

  return (
    <section className="product">
      <div className="product-container">
        <div className="product-container-img">
          <img src={props.product.thumbnail} alt={props.product.title} />
        </div>
        <div className="item-deatils">
          <div className="meta-data">
            <h2>{props.product.title}</h2>
            <h4>{props.product.brand}</h4>
            <small>{props.product.description}</small>
          </div>
          <DetailsTable rows={rows} />
        </div>
      </div>

      <div className="actions">
        <ProductEditDialog
          productName={props.product.title}
          productPrice={props.product.price}
          productDescription={props.product.description}
          submitAction={editProductHandler}
        />
        <ProductDeleteDialog
          productName={props.product.title}
          submitAction={deleteProductHandler}
        />
      </div>
    </section>
  );
}
