import { Fragment, useContext } from "react";
import AddNewProduct from "../components/products/AddNewProduct";
import { ProductContext } from "../contexts/product.context";
import { addProduct, getAllProducts } from "../lib/api";
import { NewProduct } from "../utils/interfaces/product.interface";

export default function NewProductPage() {
  const ctx = useContext(ProductContext);

  const addNewProductHandler = async (productData: NewProduct) => {
    await addProduct(productData);
    const products = await getAllProducts();
    ctx.setItems(products);
  };

  return (
    <Fragment>
      <section className="content">
        <AddNewProduct onAddNewProduct={addNewProductHandler} />
      </section>
    </Fragment>
  );
}
