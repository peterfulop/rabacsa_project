import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import useAlert from "../../../hooks/useAlert";

export default function ProjectEditDialog(props: {
  productName: string;
  productPrice: number;
  productDescription: string;
  submitAction: Function;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>(props.productName);
  const [inputPrice, setInputPrice] = useState<number>(props.productPrice);
  const [inputDescription, setInputDescription] = useState<string>(
    props.productDescription
  );

  const { setAlert, hideAlert, alert: Alert, isAlert } = useAlert();

  const handleClickOpen = () => {
    setInputName(props.productName);
    setInputPrice(props.productPrice);
    setInputDescription(props.productDescription);
    setOpen(true);
  };

  const handleClose = () => {
    hideAlert();
    setOpen(false);
  };

  const handleAction = async () => {
    if (!inputName || !inputPrice || !inputDescription) {
      setAlert("warning", "A product must have name, price, and description!");
      return;
    }
    const res = await props.submitAction(
      inputName,
      inputPrice,
      inputDescription
    );
    if (res.status === "success") {
      setAlert("success", "The product has been updated!");
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
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {"Edit"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Edit ${props.productName}`}</DialogTitle>
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
            autoFocus
            required
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
            <Alert />
          </section>
        )}
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleAction}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
