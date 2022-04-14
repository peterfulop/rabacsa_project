import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../../../contexts/product.context";
import { deleteProduct, getAllProducts } from "../../../lib/api";

export default function ProductDeleteDialog(props: {
  productName: string;
  productId: string;
  neighbourId?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const ctx = useContext(ProductContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = async () => {
    await deleteProduct(props.productId);
    const data = await getAllProducts();
    ctx.setItems(data);
    const neighborId = localStorage.getItem("neighbourid");
    if (location.pathname.split("/")[1].includes("categories")) {
      navigate(`/${location.pathname.split("/")[1]}/All Products`);
    }
    navigate(`/${location.pathname.split("/")[1]}/${neighborId}`);
    setOpen(false);
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
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleAction}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
