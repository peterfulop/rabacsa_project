import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import NoProductsFound from "../components/products/NoProductsFound";
import CategoryList from "../components/sidebar/categories/CategoryList";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";
import { ALL_PRODUCTS_TITLE } from "../utils/constans";
import { Category, Product } from "../utils/interfaces/product.interface";

export default function CategoriesPage() {
  const [isData, setIsData] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const ctx = useContext(ProductContext);
  const navigation = useNavigate();
  const params = useParams();
  const { productCategory } = params;

  const createCategories = (data: Product[]) => {
    const categories = [...data].map((product: Product) => product.category);
    const uniques = categories.reduce(function (prev: any, cur: any) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

    let uniqueCategories: Category[] = [];
    for (const key in uniques) {
      uniqueCategories.push({
        title: key,
        count: uniques[key],
      });
    }
    uniqueCategories.push({
      title: ALL_PRODUCTS_TITLE,
      count: categories.length,
    });
    return uniqueCategories;
  };

  const loadData = useCallback(async () => {
    const products = await getAllProducts();
    if (products.length === 0) {
      setIsData(false);
    } else {
      if (productCategory) {
        navigation(`/categories/${productCategory}`);
      } else {
        navigation(`/categories/${ALL_PRODUCTS_TITLE}`);
      }
      setIsData(true);
    }
    setIsLoading(false);
  }, [navigation, productCategory]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!isLoading && !isData) {
    return (
      <section className="d-flex justify-content-center w-100">
        <NoProductsFound />
      </section>
    );
  }
  return (
    <Fragment>
      <CategoryList
        categories={createCategories(ctx.items)}
        location={"categories"}
      />
      <section className="content">
        <Outlet />
      </section>
    </Fragment>
  );
}
