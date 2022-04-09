import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import useAlert from "../../../hooks/useAlert";

export default function ProductDeleteDialog(props: {
  productName: string;
  submitAction: Function;
}) {
  const [open, setOpen] = useState(false);
  const { setAlert, hideAlert, alert: Alert, isAlert } = useAlert();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    hideAlert();
    setOpen(false);
  };

  const handleAction = async () => {
    const res = await props.submitAction();
    if (res.status === "success") {
      setAlert("success", "The product has been deleted!");
    } else {
      setAlert("error", "Something went wrong!");
    }
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        {"Delete"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Delete ${props.productName}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this item?
          </DialogContentText>
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
          {!isAlert && (
            <Button variant="contained" color="error" onClick={handleAction}>
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
