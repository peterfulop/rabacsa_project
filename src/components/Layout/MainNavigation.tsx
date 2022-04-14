import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import "../../Styles/Navigation/Navigation.css";
import DropDownButton from "../UI/DropDownButton";

export default function MainNavigation() {
  const NavigationItems = () => {
    return (
      <Fragment>
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
      </Fragment>
    );
  };

  return (
    <header className="navigation">
      <nav className="container d-flex justify-content-end justify-content-between align-items-center">
        <h3 className="text-white m-0">Rabacsa Project</h3>
        <ul className="mobile-menu p-0 my-3 mx-2 d-flex d-md-none w-100">
          <DropDownButton buttonTitle="Menu">
            <NavigationItems />
          </DropDownButton>
        </ul>
        <ul className="desktop-menu p-0 d-none d-md-flex">
          <NavigationItems />
        </ul>
      </nav>
    </header>
  );
}
