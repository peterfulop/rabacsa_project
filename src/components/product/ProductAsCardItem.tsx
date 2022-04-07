import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Product } from "../../utils/interfaces/product.interface";
import ProductItem from "./Product";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function ProductEditDialog(props: {
  product: Product;
  onDeleteProduct: Function;
  onUpdateProduct: Function;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [maxWidth] = useState<DialogProps["maxWidth"]>("xl");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {"Show details"}
      </Button>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        maxWidth={maxWidth}
        onClose={handleClose}
      >
        <DialogTitle>{props.product.title}</DialogTitle>
        <DialogContent>
          <ProductItem
            products={[]}
            product={props.product}
            onDeleteProduct={props.onDeleteProduct}
            onUpdateProduct={props.onUpdateProduct}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
