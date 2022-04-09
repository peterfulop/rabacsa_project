import React, { MouseEventHandler } from "react";

export default function SidebarListItem(props: {
  children?: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLLIElement> | undefined;
}) {
  return (
    <li
      className={`sidebar-list-item ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </li>
  );
}
