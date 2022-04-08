import { useState } from "react";
import usePagination from "../../hooks/usePagination";
import { HiArrowRight } from "react-icons/hi";

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

  const [wideSize, setWideSzize] = useState<boolean>(true);

  const setSidebarWidthHandler = () => {
    setWideSzize((prevSize) => !prevSize);
    console.log(wideSize);
  };

  const buttonText = wideSize ? (
    <span>{`${props.location} (${props.data.length})`}</span>
  ) : (
    <HiArrowRight className="d-flex justfy-content-center text-center h4 m-0 p-0" />
  );

  return (
    <section
      className={`sidebar ${wideSize ? ScreenSize.wide : ScreenSize.narrow}`}
    >
      <button
        onClick={setSidebarWidthHandler}
        className={`sidebar-location-heading ${!wideSize ? "full-height" : ""}`}
      >
        {buttonText}
      </button>
      {currentItems && wideSize && props.renderContent(currentItems)}
      {currentItems && wideSize && renderPagination()}
    </section>
  );
}
