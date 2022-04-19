import { Fragment } from "react";
import AddNewProduct from "../components/products/AddNewProduct";
import useHttp from "../hooks/use-http";
import { addProduct } from "../lib/api";
import { NewProduct } from "../utils/interfaces/product.interface";

export default function NewProductPage() {
  const { sendRequest } = useHttp(addProduct);

  const addNewProductHandler = async (productData: NewProduct) => {
    await sendRequest(productData);
  };

  return (
    <Fragment>
      <section className="content">
        <AddNewProduct onAddNewProduct={addNewProductHandler} />
      </section>
    </Fragment>
  );
}
