import usePagination from "../../hooks/usePagination";

export default function SidebarItem(props: {
  data: any[];
  renderContent: Function;
  location: string;
}) {
  console.log("SidebarItem?", props.data);

  const { currentItems, renderPagination } = usePagination({
    data: props.data,
  });

  console.log("currentItems", currentItems);

  return (
    <section className="sidebar-section">
      <div>
        <p className="location-heading">
          {props.location} ({props.data.length})
        </p>
        {currentItems && props.renderContent(currentItems)}
      </div>
      {renderPagination()}
    </section>
  );
}
