import { Fragment } from "react";
import usePagination from "../../hooks/usePagination";

export default function SidebarItem(props: {
  data: any[];
  renderContent: Function;
  location: string;
}) {
  const { currentItems, renderPagination } = usePagination({
    data: props.data,
  });

  return (
    <Fragment>
      <p className="sidebar-location-heading">
        {props.location} ({props.data.length})
      </p>
      {currentItems && props.renderContent(currentItems)}
      {renderPagination()}
    </Fragment>
  );
}
