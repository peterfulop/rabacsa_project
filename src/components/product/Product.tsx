import { CardMedia } from "@mui/material";
import { Product, ProductDetails } from "../../interfaces/product.interface";
import ProductAddDialog from "./actions/ProductAddDialog";
import ProductDeleteDialog from "./actions/ProductDeleteDialog";
import ProductEditDialog from "./actions/ProductEditDialog";
import DetailsTable from "./details/ProductDetails";

import "./Product.css";

export default function ProductItem(props: { product: Product }) {
  console.log(props.product);

  const editProductHandler = () => {};
  const deleteProductHandler = () => {};
  const addProductHandler = () => {};

  const rows: ProductDetails = {
    title: props.product.title,
    brand: props.product.brand,
    category: props.product.category,
    discountPercentage: props.product.discountPercentage,
    price: props.product.price,
    stock: props.product.stock,
    rating: props.product.rating,
  };

  return (
    <section className="products">
      <CardMedia
        component="img"
        height={"300px"}
        image={props.product.thumbnail}
        alt="green iguana"
      />
      <div className="meta-data">
        <h2>{props.product.title}</h2>
        <h4>{props.product.brand}</h4>
        <small>{props.product.description}</small>
      </div>
      <div className="item-deatils">
        <DetailsTable rows={rows} />
      </div>

      <div className="actions">
        <ProductAddDialog submitAction={addProductHandler} />
        <div className="main">
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
      </div>
    </section>
  );
}
