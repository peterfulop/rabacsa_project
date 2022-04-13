import { Alert, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useInput from "../../hooks/use-inputs";
import { v4 as uuidv4 } from "uuid";

import "../../Styles/Product/NewProductForm.css";
import { NewProduct } from "../../utils/interfaces/product.interface";
import { AlertColor } from "@mui/material";

export default function AddNewProduct(props: { onAddNewProduct: Function }) {
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertColor, setAlertColor] = useState<AlertColor>("success");

  useEffect(() => {
    setIsAlert(false);
    setAlertMessage(null);
  }, []);

  const {
    value: nameInput,
    isValid: isNameValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: priceInput,
    isValid: isPriceValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    valueBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput((value: string) => value.trim() !== "" && parseInt(value) >= 0);

  const {
    value: descriptionInput,
    isValid: isDescriptionValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    valueBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput((value: string) => value.trim() !== "");

  let isFormValid: boolean = false;
  if (isNameValid && isNameValid && isPriceValid && isDescriptionValid) {
    isFormValid = true;
  }
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isNameValid || !isPriceValid || !isDescriptionValid) {
      setIsAlert(true);
      setAlertMessage("All fields are required!");
      setAlertColor("error");
      return;
    }
    resetName();
    resetPrice();
    resetDescription();

    const newProduct: NewProduct = {
      title: nameInput.trim() as string,
      price: priceInput.trim(),
      description: descriptionInput.trim(),
      id: uuidv4(),
      category: "uncategorized",
      thumbnail: "https://picsum.photos/200",
    };

    await props.onAddNewProduct(newProduct);
    setIsAlert(true);
    setAlertMessage("Product has been added!");
    setAlertColor("success");
  };

  return (
    <section className="new-product">
      <h1>Add new product</h1>
      <form onSubmit={(e) => submitForm(e)}>
        <div className={"form-input"}>
          <TextField
            className={nameHasError ? "invalid" : "input control"}
            required
            margin="dense"
            id="name"
            label="Product name:"
            type="text"
            value={nameInput}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && (
            <small className={"invalidText"}>Name must not be empty!</small>
          )}
        </div>
        <div className={"form-input"}>
          <TextField
            className={priceHasError ? "invalid" : "input control"}
            type="number"
            required
            margin="dense"
            id="price"
            label="Product price:"
            value={priceInput}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
          />
          {priceHasError && (
            <small className={"invalidText"}>
              Price must not be empty, and more than 0!
            </small>
          )}
        </div>
        <div className={"form-input"}>
          <TextField
            className={descriptionHasError ? "invalid" : "input control"}
            type="text"
            required
            margin="dense"
            id="description"
            label="Product description:"
            value={descriptionInput}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          />
          {descriptionHasError && (
            <small className={"invalidText"}>
              Description must not be empty!
            </small>
          )}
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid}
        >
          Add Product
        </Button>
      </form>
      {isAlert && (
        <section className="alert-section">
          <Alert
            severity={alertColor}
            onClose={() => {
              setIsAlert(false);
            }}
          >
            <strong>{alertMessage}</strong>
          </Alert>
        </section>
      )}
    </section>
  );
}
