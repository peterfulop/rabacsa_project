import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";

import "../../../Styles/Dialog/Dialog.css";
import useAlert from "../../../hooks/useAlert";

export default function ProductAddDialog(props: { submitAction: Function }) {
  const [open, setOpen] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>("");
  const [inputPrice, setInputPrice] = useState<number | string>("");
  const [inputDescription, setInputDescription] = useState<string>("");

  const { setAlert, hideAlert, alert: Alert, isAlert } = useAlert();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    hideAlert();
    clearInputs();
    setOpen(false);
  };

  const clearInputs = () => {
    setInputPrice("");
    setInputName("");
    setInputDescription("");
  };

  const handleAction = async () => {
    if (!inputName || !Number(inputPrice) || !inputDescription) {
      setAlert("warning", "All fields are required!");
      return;
    }
    const res = await props.submitAction(
      inputName,
      inputPrice,
      inputDescription
    );
    if (res.status === "success") {
      clearInputs();
      setAlert("success", "Product has been added!");
    } else {
      setAlert("error", "Something went wrong!");
    }
  };

  const setNameHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    setInputName(e.target.value);
  };

  const setPriceHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    setInputPrice(Number(e.target.value));
  };

  const setDescriptionHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    setInputDescription(e.target.value);
  };

  return (
    <div className="product-add-dialog">
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        {"Add new"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Add new product"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="title:"
            type="text"
            fullWidth
            variant="standard"
            value={inputName}
            onChange={(e) => setNameHandler(e)}
          />
          <TextField
            required
            margin="dense"
            id="name"
            label="price:"
            type="number"
            fullWidth
            variant="standard"
            value={inputPrice}
            onChange={(e) => setPriceHandler(e)}
          />
          <TextField
            required
            margin="dense"
            id="name"
            label="description:"
            type="text"
            fullWidth
            variant="standard"
            value={inputDescription}
            onChange={(e) => setDescriptionHandler(e)}
          />
        </DialogContent>
        {isAlert && (
          <section className="alert-section">
            <Alert />
          </section>
        )}
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleAction}>
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
