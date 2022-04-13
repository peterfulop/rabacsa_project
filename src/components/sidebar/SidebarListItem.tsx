import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

export default function SidebarListItem(props: {
  children?: React.ReactNode;
  className?: string;
  href: string;
  onClick?: MouseEventHandler<HTMLLIElement> | undefined;
}) {
  return (
    <Link to={props.href} className={`sidebar-list-item ${props.className}`}>
      {props.children}
    </Link>
  );
}
