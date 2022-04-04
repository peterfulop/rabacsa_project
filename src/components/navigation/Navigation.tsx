import { Button } from "@mui/material";
import "./Navigation.css";

export default function Navigation(props: {
  onGetAllProducts: Function;
  onGetAllCategories: Function;
}) {
  return (
    <section className="navigation">
      <h1>Products Page</h1>
      <div>
        <Button
          variant="contained"
          color="info"
          onClick={() => props.onGetAllProducts()}
        >
          Products
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={() => props.onGetAllCategories()}
        >
          Categories
        </Button>
      </div>
    </section>
  );
}
