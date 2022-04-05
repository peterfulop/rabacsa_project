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
