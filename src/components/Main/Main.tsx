import { MouseEventHandler, useContext, useEffect, useState } from "react";
import ProductContext from "../../contexts/product.context";
import { Category, Product } from "../../interfaces/product.interface";
import Navigation from "../Navigation/Navigation";
import ProductItem from "../Product/Product";
import ProductList from "../Sidebar/ProductList/ProductList";
import CategoryList from "../Sidebar/CategoryList/CategoryList";
import Content from "../Content/Content";

/**MUI */
import Grid from "@mui/material/Grid";
import ProductAsListItem from "../Product/productList/ProductAsListItem";

function Main() {
  const productContext = useContext(ProductContext);

  /** REBUILD   */
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isProductList, setIsProductList] = useState<boolean>(true);
  const [isCategoryList, setIsCategoryList] = useState<boolean>(false);
  const [isTopList, setIsTopList] = useState<boolean>(false);
  const [isActiveCategory, setIsActiveCategory] = useState<boolean>(false);
  const [isEnabledAllProducts, setIsEnabledAllProducts] =
    useState<boolean>(false);

  const [location, setLocation] = useState<string>("Products");
  const [activeProduct, setActiveProduct] = useState<Product | null>(
    productContext[0]
  );
  const [activeCategory, setActiveCategory] = useState<string>("smartphones");

  useEffect(() => {
    setProducts(productContext);
  }, [productContext]);

  const getProductsHandler: MouseEventHandler = (event) => {
    setLocation(event.currentTarget.textContent as string);
    setProducts(productContext);
    setIsProductList(true);
    setIsCategoryList(false);
    setIsActiveCategory(false);
    setIsTopList(false);
    setActiveProduct(productContext[0]);
  };

  const getCategoriesHandler: MouseEventHandler = (event) => {
    setActiveCategory("");
    setProducts(productContext);
    setLocation(event.currentTarget.textContent as string);
    const categories = [...productContext].map(
      (product: Product) => product.category
    );
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
      title: "All Products",
      count: categories.length,
    });
    setCategories(uniqueCategories);
    setActiveCategory("All Products");

    setIsCategoryList(true);
    setIsActiveCategory(true);
    setIsEnabledAllProducts(true);
    setIsProductList(false);
    setIsTopList(false);
    setActiveProduct(null);
  };

  const getTopListHandler: MouseEventHandler = (event) => {
    setLocation(event.currentTarget.textContent as string);
    const topList = [...productContext]
      .sort((a, b) => b.price - a.price)
      .slice(0, 25);
    setIsCategoryList(false);
    setIsProductList(false);
    setIsActiveCategory(false);
    setIsTopList(true);
    setProducts(topList);
    setActiveProduct(topList[0]);
  };

  const selectProductHandler = (id: string) => {
    const activeProduct = [...products].find((product) => product.id === id);
    setActiveProduct(activeProduct as Product);
  };

  const selectProductsByCategoryHandler = (category: string) => {
    setActiveCategory(category);
    if (category.toLowerCase() === "all products") {
      setProducts(productContext);
      setIsActiveCategory(true);
    } else {
      const productsByCategory = [...productContext].filter(
        (product) => product.category === category
      );
      setProducts(productsByCategory);
    }
    setIsActiveCategory(true);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Navigation
          onGetAllProducts={getProductsHandler}
          onGetAllCategories={getCategoriesHandler}
          onGetTopList={getTopListHandler}
        />
      </Grid>
      <Grid item xs={3} className="sidebar">
        {isProductList && (
          <ProductList
            location={location}
            products={products}
            onSelectProduct={selectProductHandler}
            activeProductId={activeProduct?.id}
          />
        )}
        {isCategoryList && (
          <CategoryList
            location={location}
            categories={categories}
            products={products}
            onSelectCategory={selectProductsByCategoryHandler}
            activeCategory={activeCategory}
          />
        )}
        {isTopList && (
          <ProductList
            location={location}
            products={products}
            onSelectProduct={selectProductHandler}
            activeProductId={activeProduct?.id}
          />
        )}
      </Grid>
      <Grid item xs={9}>
        <Content>
          {activeProduct && <ProductItem product={activeProduct} />}
          {isActiveCategory && (
            <ProductAsListItem
              product={products}
              onGetAllProducts={getCategoriesHandler}
              activeCategory={activeCategory}
            />
          )}
        </Content>
      </Grid>
    </Grid>
  );
}

export default Main;
