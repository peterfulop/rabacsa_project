import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Alert,
} from "@mui/material";
import React, { useState } from "react";

import "../../../Styles/Dialog/Dialog.css";

import { AlertColor } from "@mui/material";
import { Col } from "react-bootstrap";

export default function ProductAddDialog(props: { submitAction: Function }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [inputName, setInputName] = React.useState<string>();
  const [inputPrice, setInputPrice] = React.useState<number | null>();
  const [inputDescription, setInputDescription] = React.useState<string>();

  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertColor, setAlertColor] = useState<AlertColor>("success");

  const handleClickOpen = () => {
    clearInputs();
    setOpen(true);
  };

  const handleClose = () => {
    clearInputs();
    setOpen(false);
  };

  const clearInputs = () => {
    setIsAlert(false);
    setAlertMessage(null);
    setInputPrice(null);
    setInputName("");
    setInputDescription("");
  };

  const handleAction = async () => {
    console.log(inputName, inputPrice, inputDescription);

    if (!inputName || !Number(inputPrice) || !inputDescription) {
      setIsAlert(true);
      setAlertMessage("All fields are required!");
      setAlertColor("error");
      return;
    }
    await props.submitAction(inputName, inputPrice, inputDescription);
    setOpen(false);
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
    <Col className="product-add-dialog">
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        {"Add new Product"}
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
            defaultValue={inputName}
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
            defaultValue={inputPrice}
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
            defaultValue={inputDescription}
            onChange={(e) => setDescriptionHandler(e)}
          />
        </DialogContent>
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
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleAction}>
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Col>
  );
}
