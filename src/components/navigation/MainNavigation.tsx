import "../../Styles/Navigation/Navigation.css";
import DropDownButton from "../UI/DropDownButton";

import { NAVIGATION_ITEMS } from "../../utils/constans";
import { NavigationItem } from "../../utils/interfaces/product.interface";
import NavigationComponent from "./NavigationLink";

export default function MainNavigation() {
  return (
    <header className="navigation">
      <nav className="container d-flex justify-content-end justify-content-between align-items-center">
        <h3 className="text-white m-0">Rabacsa Project</h3>
        <ul className="mobile-menu p-0 my-3 mx-2 d-flex d-md-none w-100">
          <DropDownButton buttonTitle="Menu">
            {NAVIGATION_ITEMS.map((nav: NavigationItem) => {
              return (
                <NavigationComponent navigationItem={nav} key={nav.title} />
              );
            })}
          </DropDownButton>
        </ul>
        <ul className="desktop-menu p-0 d-none d-md-flex">
          {NAVIGATION_ITEMS.map((nav: NavigationItem) => {
            return (
              <li key={nav.title}>
                <NavigationComponent navigationItem={nav} />
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
