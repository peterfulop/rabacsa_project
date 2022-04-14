import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { RiArrowDownSLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function FadeMenu(props: {
  buttonTitle: string;
  children?: React.ReactNode;
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
    <React.Fragment>
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
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        className={"drop-down-button"}
      >
        {props.children}
      </Menu>
    </React.Fragment>
  );
}

{
  /* <MenuItem
onClick={(e) => {
  handleClose();
}}
>
<NavLink
  className={(navData) => (navData.isActive ? "active" : "")}
  to={"/toplist"}
>
  Toplist
</NavLink>
</MenuItem> */
}
