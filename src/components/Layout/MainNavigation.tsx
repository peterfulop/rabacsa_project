import { NavLink } from "react-router-dom";

import "../../Styles/Navigation/Navigation.css";

export default function MainNavigation() {
  return (
    <header className="navigation">
      <nav className="container">
        <ul>
          <li>
            <NavLink
              to={"/new-product"}
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              Add new!
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/products"}
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to={"/categories"}
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to={"/toplist"}
            >
              Toplist
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
