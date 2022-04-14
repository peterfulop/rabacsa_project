import React, { Fragment } from "react";
import MainNavigation from "./MainNavigation";

import "../../Styles/Main/Main.css";

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <Fragment>
      <MainNavigation />
      <main className="container main flex-wrap flex-md-nowrap">
        {props.children}
      </main>
    </Fragment>
  );
}
