import { useState } from "react";
import usePagination from "../../hooks/usePagination";
import { HiArrowRight } from "react-icons/hi";

import "../../Styles/Sidebar/Sidebar.css";

enum ScreenSize {
  wide = "wide",
  narrow = "narrow",
}

export default function SidebarItem(props: {
  data: any[];
  renderContent: Function;
  location: string;
}) {
  const { currentItems, renderPagination } = usePagination({
    data: props.data,
  });

  const [mobileView, setMobileView] = useState<boolean>(true);

  const setSidebarWidthHandler = () => {
    setMobileView((prevSize) => !prevSize);
  };

  return (
    <section className={`sidebar`}>
      <button
        onClick={setSidebarWidthHandler}
        className={`sidebar-location-heading`}
      >
        {`${props.location} (${props.data.length})`}
      </button>
      {currentItems && mobileView && (
        <section className="sidebar-list-content">
          {props.renderContent(currentItems)}
          {renderPagination()}
        </section>
      )}
    </section>
  );
}
