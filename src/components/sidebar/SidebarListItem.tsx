import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/global.context";

export default function SidebarListItem(props: {
  children?: React.ReactNode;
  className?: string;
  href: string;
  neighbourId?: string;
}) {
  const globalCtx = useContext(GlobalContext);

  const linkClickHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const id = event.currentTarget.dataset["neighbourid"] as string;
    console.log(id);

    globalCtx.setNeighbour(id as string);
  };

  return (
    <Link
      to={props.href}
      data-neighbourid={props.neighbourId}
      className={`sidebar-list-item ${props.className}`}
      onClick={(e) => linkClickHandler(e)}
    >
      {props.children}
    </Link>
  );
}
