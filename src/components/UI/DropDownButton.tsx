import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { RiArrowDownSLine } from "react-icons/ri";

export default function FadeMenu(props: {
  buttonTitle: string;
  onGetProducts: Function;
  onGetTopList: Function;
  onGetCategories: Function;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="info"
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        endIcon={<RiArrowDownSLine />}
        onClick={handleClick}
      >
        {props.buttonTitle}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={(e) => {
            props.onGetProducts(e);
            handleClose();
          }}
        >
          Products
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            props.onGetCategories(e);
            handleClose();
          }}
        >
          Categories
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            props.onGetTopList(e);
            handleClose();
          }}
        >
          TopList
        </MenuItem>
      </Menu>
    </div>
  );
}
