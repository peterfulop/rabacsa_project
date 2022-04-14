import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/product.context";
import { Product } from "../../utils/interfaces/product.interface";
import ProductDeleteDialog from "./actions/ProductDeleteDialog";
import ProductEditDialog from "./actions/ProductEditDialog";
import ProductDetails from "./details/ProductDetails";

import "../../Styles/Product/Product.css";
import ProductImageList from "./ProductImageList";

export default function ProductItem(props: {
  product: Product;
  products: Product[];
  onUpdateProduct: Function;
  onDeleteProduct: Function;
}) {
  const { updateItem, removeItem } = useContext(ProductContext);
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

  const rows = {
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
      <ProductDetails rows={rows} />
      <div className="product-actions">
        {/* <ProductEditDialog
          productName={props.product.title}
          productPrice={props.product.price}
          productDescription={props.product.description}
          // submitAction={()=>{}}
        /> */}
        {/* <ProductDeleteDialog
          productId=""
          productName={props.product.title}
          // submitAction={()=>{}}
        /> */}
      </div>
    </section>
  );
}
