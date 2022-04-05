import React from "react";

export default function Content(props: { children?: React.ReactNode }) {
  return <section>{props.children}</section>;
}
