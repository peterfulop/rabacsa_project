import { Link } from "react-router-dom";

const NoQuotesFound = (props: { plural?: boolean }) => {
  return (
    <div className={""}>
      <p>No {props.plural ? "products" : "product"} found!</p>
      {/* <Link to="/new-quote" className="btn">
        Add a Quote
      </Link> */}
    </div>
  );
};

export default NoQuotesFound;
