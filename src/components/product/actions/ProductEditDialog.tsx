import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ProjectEditDialog(props: {
  productName: string;
  productPrice: number;
  productDescription: string;
  submitAction: Function;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [inputName, setInputName] = React.useState<string>(props.productName);
  const [inputPrice, setInputPrice] = React.useState<number>(
    props.productPrice
  );
  const [inputDescription, setInputDescription] = React.useState<string>(
    props.productDescription
  );

  const handleClickOpen = () => {
    setInputName(props.productName);
    setInputPrice(props.productPrice);
    setInputDescription(props.productDescription);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = async () => {
    if (!inputName) {
    } else if (inputName === props.productName) {
      setOpen(false);
    }
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
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {"Edit"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Edit ${props.productName}`}</DialogTitle>
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
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
