import {
  MouseEventHandler,
  ReactEventHandler,
  ReactHTMLElement,
  useContext,
  useEffect,
  useState,
} from "react";
import ProductContext from "../../contexts/product.context";
import { Category, Product } from "../../interfaces/product.interface";
import { PRODUCT_PER_PAGE } from "../../utils/constans";
import Navigation from "../navigation/Navigation";
import Pagination from "../Pagination/Pagination";
import Sidebar from "../sidebar/Sidebar";
import PaginationComponent from "../Pagination/PaginationComponent";

/**MUI */
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductItem from "../product/Product";
import ProductList from "../sidebar/ProductList/ProductList";
import CategoryList from "../sidebar/CategoryList/CategoryList";

/** */

function Main() {
  const productContext = useContext(ProductContext);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Product[] | Category[]>([]);
  // const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  /** REBUILD   */
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isProductList, setIsProductList] = useState<boolean>(false);
  const [isCategoryList, setIsCategoryList] = useState<boolean>(false);

  const [location, setLocation] = useState<string>("Products");
  // useEffect(() => {
  //   setProducts(productContext);
  // }, [productContext]);

  /** */

  // useEffect(() => {
  //   setProducts(productContext);
  //   setData(productContext);
  //   setLocation("products");
  //   setTotalPages(Math.ceil(productContext.length / PRODUCT_PER_PAGE));
  // }, [productContext]);

  const getProductsHandler: MouseEventHandler = async (event) => {
    setLocation(event.currentTarget.textContent as string);
    setProducts(productContext);
    setIsProductList(true);
    setIsCategoryList(false);
  };

  const getCategoriesHandler: MouseEventHandler = async (event) => {
    setLocation(event.currentTarget.textContent as string);

    const categories = products.map((product: Product) => product.category);
    let uniqueCategories = categories
      .filter((element: string, index: number) => {
        return categories.indexOf(element) === index;
      })
      .map((categorie, index: number) => {
        return { title: categorie, id: index };
      });
    setIsCategoryList(true);
    setIsProductList(false);
    setCategories(uniqueCategories);
  };

  // const getAllCategoriesHandler = async () => {
  //   const categories = products.map((product: Product) => product.category);
  //   let uniqueCategories = categories
  //     .filter((element: string, index: number) => {
  //       return categories.indexOf(element) === index;
  //     })
  //     .map((categorie, index: number) => {
  //       return { title: categorie, id: index };
  //     });
  //   setTotalPages(Math.ceil(uniqueCategories.length / PRODUCT_PER_PAGE));
  //   setData(uniqueCategories);
  //   setLocation("categorires");

  //   setPage(1);
  // };

  // const handlePaginationClick = (number: number) => {
  //   setPage(number);
  // };

  // const handleSelectItem = (id: string) => {
  //   const activeProduct = products.find((product) => product.id === id);
  //   setActiveProduct(activeProduct as Product);
  // };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Navigation
            onGetAllProducts={getProductsHandler}
            onGetAllCategories={getCategoriesHandler}
          />
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="sidebar"
        >
          <section className="sidebar">
            {isProductList && (
              <ProductList location={location} products={products} />
            )}
            {isCategoryList && (
              <CategoryList location={location} categories={categories} />
            )}
          </section>
          {/* <Sidebar
            location={location}
            data={data}
            page={page}
            activeProduct={activeProduct?.id}
            onClickHandler={handleSelectItem}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onClickHandler={handlePaginationClick}
          /> */}
        </Grid>
        <Grid item xs={9}>
          {/* {activeProduct && <ProductItem product={activeProduct} />} */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Main;
