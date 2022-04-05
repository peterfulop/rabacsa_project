import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import React from "react";

export default function ProductAddDialog(props: { submitAction: Function }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [inputName, setInputName] = React.useState<string>();
  const [inputPrice, setInputPrice] = React.useState<number>();
  const [inputDescription, setInputDescription] = React.useState<string>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = async () => {
    await props.submitAction(inputName);
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
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        {"Add new Product"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Add new product"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
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
            autoFocus
            margin="dense"
            id="name"
            label="price:"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={inputPrice}
            onChange={(e) => setPriceHandler(e)}
          />
          <TextField
            autoFocus
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
