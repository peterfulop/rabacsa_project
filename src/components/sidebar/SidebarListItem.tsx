import React from "react";
import { Link } from "react-router-dom";

export default function SidebarListItem(props: {
  children?: React.ReactNode;
  className?: string;
  href: string;
  neighbourId?: string;
}) {
  const linkClickHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const id = event.currentTarget.dataset["neighbourid"] as string;
    localStorage.setItem("neighbourid", id);
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
