import { useContext, useEffect, useState } from "react";
import ProductContext from "../../contexts/product.context";
import { Category, Product } from "../../interfaces/product.interface";
import { PRODUCT_PER_PAGE } from "../../utils/constans";
import Navigation from "../navigation/Navigation";
import Pagination from "../Pagination/Pagination";
import Sidebar from "../sidebar/Sidebar";

/**MUI */
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductItem from "../product/Product";

/** */

function Main() {
  const productContext = useContext(ProductContext);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [data, setData] = useState<Product[] | Category[]>([]);
  const [location, setLocation] = useState<string>("");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProducts(productContext);
    setData(productContext);
    setLocation("products");
    setTotalPages(Math.ceil(productContext.length / PRODUCT_PER_PAGE));
  }, [productContext]);

  const getAllProductsHandler = async () => {
    setTotalPages(Math.ceil(products.length / PRODUCT_PER_PAGE));
    setData(products);
    setLocation("products");
    setPage(1);
  };

  const getAllCategoriesHandler = async () => {
    const categories = products.map((product: Product) => product.category);
    let uniqueCategories = categories
      .filter((element: string, index: number) => {
        return categories.indexOf(element) === index;
      })
      .map((categorie, index: number) => {
        return { title: categorie, id: index };
      });
    setTotalPages(Math.ceil(uniqueCategories.length / PRODUCT_PER_PAGE));
    setData(uniqueCategories);
    setLocation("categorires");

    setPage(1);
  };

  const handlePaginationClick = (number: number) => {
    setPage(number);
  };

  const handleSelectItem = (id: string) => {
    const activeProduct = products.find((product) => product.id === id);
    setActiveProduct(activeProduct as Product);
    console.log(activeProduct);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Navigation
            onGetAllProducts={getAllProductsHandler}
            onGetAllCategories={getAllCategoriesHandler}
          />
        </Grid>
        <Grid item xs={3} className="sidebar">
          <Sidebar
            location={location}
            data={data}
            page={page}
            onClickHandler={handleSelectItem}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onClickHandler={handlePaginationClick}
          />
        </Grid>
        <Grid item xs={9}>
          {activeProduct && <ProductItem product={activeProduct} />}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Main;
