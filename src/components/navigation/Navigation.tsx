import { Button } from "@mui/material";
import "./Navigation.css";

export default function Navigation(props: {
  onGetAllProducts: Function;
  onGetAllCategories: Function;
}) {
  return (
    <section className="navigation">
      <h1>Rabacsa Project</h1>
      <div>
        <Button
          variant="contained"
          color="info"
          onClick={(e) => props.onGetAllProducts(e)}
        >
          Products
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={(e) => props.onGetAllCategories(e)}
        >
          Categories
        </Button>
      </div>
    </section>
  );
}
