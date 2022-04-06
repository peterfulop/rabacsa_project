import { useContext, useEffect, useState } from "react";
import ProductContext from "../../contexts/product.context";
import { Product, ProductDetails } from "../../interfaces/product.interface";
import ProductDeleteDialog from "./actions/ProductDeleteDialog";
import ProductEditDialog from "./actions/ProductEditDialog";
import DetailsTable from "./details/ProductDetails";

import "./Product.css";

export default function ProductItem(props: {
  products: Product[];
  product: Product;
  onUpdateProduct: Function;
}) {
  const ctx = useContext(ProductContext);
  const [activeProductId, setActiveProductId] = useState<string>("");
  const [product, setProduct] = useState<Product>(props.product);

  useEffect(() => {
    console.log("Product useEffect");
    setProduct(props.product);
    setActiveProductId(props.product.id);
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
    console.log(props.products);
  };

  const deleteProductHandler = () => {
    ctx.removeItem(activeProductId);
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

  // const rows: ProductDetails = {
  //   title: props.product.title,
  //   brand: props.product.brand,
  //   category: props.product.category,
  //   discountPercentage: props.product.discountPercentage,
  //   price: props.product.price,
  //   stock: props.product.stock,
  //   rating: props.product.rating,
  //   description: props.product.description,
  // };

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
