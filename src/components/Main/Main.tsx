import { MouseEventHandler, useContext, useEffect, useState } from "react";
import ProductContext from "../../contexts/product.context";
import { Category, Product } from "../../interfaces/product.interface";
import Navigation from "../Navigation/Navigation";
import ProductItem from "../Product/Product";
import ProductList from "../Sidebar/ProductList/ProductList";
import CategoryList from "../Sidebar/CategoryList/CategoryList";
import productsJson from "../../data/products.json";

/**MUI */
import Grid from "@mui/material/Grid";
import ProductAsListItem from "../Product/productList/ProductAsListItem";
import ProductAddDialog from "../Product/actions/ProductAddDialog";
import { v4 as uuidv4 } from "uuid";

function Main() {
  const productContext = useContext(ProductContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isProductList, setIsProductList] = useState<boolean>(true);
  const [isCategoryList, setIsCategoryList] = useState<boolean>(false);
  const [isTopList, setIsTopList] = useState<boolean>(false);
  const [isActiveCategory, setIsActiveCategory] = useState<boolean>(false);

  const [location, setLocation] = useState<string>("Products");
  const [activeProduct, setActiveProduct] = useState<Product | null>(
    productContext.items[0]
  );
  const [activeCategory, setActiveCategory] = useState<string>("smartphones");

  useEffect(() => {
    setProducts(productContext.items);
  }, [productContext.items]);

  const getProductsHandler: MouseEventHandler = (event) => {
    console.log("getProductsHandler");
    setIsProductList(true);
    setLocation(event.currentTarget.textContent as string);
    setProducts(productContext.items);
    setIsCategoryList(false);
    setIsActiveCategory(false);
    setIsTopList(false);
    setActiveProduct(productContext.items[0]);
  };

  const getCategoriesHandler: MouseEventHandler = (event) => {
    console.log("getCategoriesHandler");

    setActiveCategory("");
    setProducts(productContext.items);

    setLocation(event.currentTarget.textContent as string);

    const categories = [...productContext.items].map(
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
    setIsProductList(false);
    setIsTopList(false);
    setActiveProduct(null);
  };

  const getTopListHandler: MouseEventHandler = (event) => {
    setLocation(event.currentTarget.textContent as string);
    const topList = [...products]
      .sort((a, b) => b.price - a.price)
      .slice(0, 25);
    setIsCategoryList(false);
    setIsProductList(false);
    setIsActiveCategory(false);
    setIsTopList(true);
    setProducts(topList);
    setActiveProduct(topList[0]);
  };

  const selectProductHandler = (product: Product) => {
    setActiveProduct(product);
  };

  const selectProductsByCategoryHandler = (category: string) => {
    setActiveCategory(category);
    if (category.toLowerCase() === "all products") {
      setProducts(productContext.items);
    } else {
      const productsByCategory = [...productContext.items].filter(
        (product: Product) => product.category === category
      );
      setProducts(productsByCategory);
    }
    setIsActiveCategory(true);
  };

  /** ACTIONS */

  const addNewProductHandler = async (
    title: string,
    price: number,
    description: string
  ) => {
    const newProduct: Product = {
      title,
      price,
      description,
      id: uuidv4(),
      category: "uncategorized",
    };

    productContext.addItem(newProduct);
    setProducts(productContext.items);
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
            products={products}
            location={location}
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
            products={products}
            location={location}
            onSelectProduct={selectProductHandler}
            activeProductId={activeProduct?.id}
          />
        )}
      </Grid>
      <Grid item xs={9}>
        {activeProduct && (
          <section className="content">
            <ProductItem product={activeProduct} />
            <ProductAddDialog submitAction={addNewProductHandler} />
          </section>
        )}
        {isActiveCategory && (
          <ProductAsListItem
            product={products}
            onGetAllProducts={getCategoriesHandler}
            activeCategory={activeCategory}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Main;
