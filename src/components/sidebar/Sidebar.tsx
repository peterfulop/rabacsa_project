import { useState } from "react";
import usePagination from "../../hooks/use-Pagination";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

import "../../Styles/Sidebar/Sidebar.css";

export default function SidebarItem(props: {
  data: any[];
  renderContent: Function;
  location: string;
}) {
  const { currentItems, renderPagination } = usePagination({
    data: props.data,
  });

  const [smallSize, setSmallSize] = useState<boolean>(true);

  const setSidebarWidthHandler = () => {
    setSmallSize((size) => !size);
  };

  const sidebarListContentClasses =
    currentItems && smallSize
      ? `sidebar-list-content active`
      : `sidebar-list-content inactive`;

  return (
    <section className={`sidebar`}>
      <button
        onClick={setSidebarWidthHandler}
        className={`sidebar-location-heading ${
          smallSize ? "active" : "inactive"
        }`}
      >
        {`${props.location} (${props.data.length})`}
        {smallSize ? (
          <BsFillCaretUpFill size={20} />
        ) : (
          <BsFillCaretDownFill size={20} />
        )}
      </button>
      <section className={sidebarListContentClasses}>
        {props.renderContent(currentItems)}
        {renderPagination()}
      </section>
    </section>
  );
}
