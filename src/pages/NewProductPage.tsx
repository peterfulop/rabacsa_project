import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddNewProduct from "../components/products/AddNewProduct";
import useHttp from "../hooks/use-http";
import { addProduct } from "../lib/api";
import { NewProduct } from "../utils/interfaces/product.interface";

export default function NewProductPage() {
  const { sendRequest, status } = useHttp(addProduct);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
    }
  }, [status, navigate]);

  const addNewProductHandler = (productData: NewProduct) => {
    sendRequest(productData);
  };

  return (
    <Fragment>
      <section className="content">
        <AddNewProduct onAddNewProduct={addNewProductHandler} />
      </section>
    </Fragment>
  );
}
