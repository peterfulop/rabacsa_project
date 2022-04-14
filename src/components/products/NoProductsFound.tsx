import { Link } from "react-router-dom";

const NoProductsFound = (props: { plural?: boolean }) => {
  return (
    <div className="no-products-found">
      <p>No {props.plural ? "products" : "product"} found!</p>
      <Link to="/new-product" className="btn btn-primary">
        Add Product
      </Link>
    </div>
  );
};

export default NoProductsFound;
