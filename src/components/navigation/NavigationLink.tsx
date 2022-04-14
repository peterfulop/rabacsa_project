import { NavLink } from "react-router-dom";
import { NavigationItem } from "../../utils/interfaces/product.interface";

export default function NavigationLink(props: {
  navigationItem: NavigationItem;
}) {
  return (
    <NavLink
      key={props.navigationItem.title}
      to={props.navigationItem.to}
      className={(navData) => (navData.isActive ? "active" : "")}
    >
      {props.navigationItem.title}
    </NavLink>
  );
}
