import { useContext, useEffect, useState } from "react";
import ProductContext from "../../contexts/product.context";
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
  const ctx = useContext(ProductContext);
  const [activeProductId, setActiveProductId] = useState<string>("");
  const [product, setProduct] = useState<Product>(props.product);

  useEffect(() => {
    setActiveProductId(props.product.id);
    setProduct(props.product);
  }, [props.product, activeProductId]);

  const editProductHandler = (
    inputTitle: string,
    inputPrice: number,
    inputDescription: string
  ) => {
    ctx.updateItem({
      id: activeProductId,
      title: inputTitle,
      price: inputPrice,
      description: inputDescription,
    });

    const updatedProduct: Product = {
      ...product,
      title: inputTitle,
      price: inputPrice,
      description: inputDescription,
    };
    props.onUpdateProduct(updatedProduct);
  };

  const deleteProductHandler = () => {
    ctx.removeItem(activeProductId);
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
    title: product.title,
    brand: product.brand,
    category: product.category,
    discountPercentage: product.discountPercentage,
    price: product.price,
    stock: product.stock,
    rating: product.rating,
    description: product.description,
  };

  return (
    <section className="product">
      <div className="product-container">
        <div className="product-container-img">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="item-deatils">
          <div className="meta-data">
            <h2>{product.title}</h2>
            <h4>{product.brand}</h4>
            <small>{product.description}</small>
          </div>
          <DetailsTable rows={rows} />
        </div>
      </div>

      <div className="actions">
        <ProductEditDialog
          productName={product.title}
          productPrice={product.price}
          productDescription={product.description}
          submitAction={editProductHandler}
        />
        <ProductDeleteDialog
          productName={product.title}
          submitAction={deleteProductHandler}
        />
      </div>
    </section>
  );
}
