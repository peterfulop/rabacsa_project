import {
  Fragment,
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Category, Product } from "../../utils/interfaces/product.interface";
import Navigation from "../Navigation/Navigation";
import ProductItem from "../Product/Product";
import ProductList from "../Sidebar/ProductList/ProductList";
import CategoryList from "../Sidebar/CategoryList/CategoryList";
import productsJson from "../../data/products.json";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.css";

/**MUI */
import ProductAsListItem from "../Product/ProductAsListItem";
import ProductAddDialog from "../Product/actions/ProductAddDialog";
import { v4 as uuidv4 } from "uuid";
import { ProductContext } from "../../contexts/product.context";
import useProductReloader from "../../hooks/useProductReloader";

function Main() {
  const { items, addItem } = useContext(ProductContext);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isProductList, setIsProductList] = useState<boolean>(true);
  const [isCategoryList, setIsCategoryList] = useState<boolean>(false);
  const [isTopList, setIsTopList] = useState<boolean>(false);
  const [isActiveCategory, setIsActiveCategory] = useState<boolean>(false);

  const [location, setLocation] = useState<string>("Products");
  const [activeProduct, setActiveProduct] = useState<Product | null>(items[0]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  let reloadedData = useProductReloader({ data: items });

  useEffect(() => {
    setProducts(items);
  }, [items]);

  useEffect(() => {
    if (firstLoad) {
      setProducts(items);
      setFirstLoad(false);
    }
  }, [firstLoad, items]);

  useEffect(() => {
    if (!firstLoad && reloadedData.freshData.length) {
      if (!isActiveCategory) {
        setProducts(reloadedData.freshData);
        console.log("reloaded at:", reloadedData.timeStamp.toLocaleString());
      }
    }
  }, [
    reloadedData.freshData,
    reloadedData.timeStamp,
    firstLoad,
    items,
    isActiveCategory,
  ]);

  const getProductsHandler: MouseEventHandler = (event) => {
    setLocation(event.currentTarget.textContent as string);
    getProducts();
  };

  const getProducts = (prevProductIndex: number = 0) => {
    setIsProductList(true);
    setProducts(items);
    setIsCategoryList(false);
    setIsActiveCategory(false);
    setIsTopList(false);
    setActiveProduct(items[prevProductIndex]);
  };

  const getCategoriesHandler: MouseEventHandler = (event) => {
    setLocation(event.currentTarget.textContent as string);
    getCategories();
  };

  const getTopListHandler: MouseEventHandler = (event) => {
    setLocation(event.currentTarget.textContent as string);
    getToplist();
  };

  const selectProductHandler = (product: Product) => {
    setActiveProduct(product);
  };

  const getCategories = useCallback(() => {
    setProducts(items);
    const categories = [...items].map((product: Product) => product.category);

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
  }, [items]);

  const getToplist = useCallback(
    (setActive: boolean = true) => {
      const topList = [...items]
        .sort((a: any, b: any) => b.price - a.price)
        .slice(0, 25);
      setIsCategoryList(false);
      setIsProductList(false);
      setIsActiveCategory(false);
      setIsTopList(true);
      setProducts(topList);
      setActive && setActiveProduct(topList[0]);
    },
    [items]
  );

  const selectProductsByCategoryHandler = useCallback(
    (category: string) => {
      setActiveCategory(category);
      if (category.toLowerCase() === "all products") {
        setProducts(items);
      } else {
        const productsByCategory = [...items].filter(
          (product: Product) => product.category === category
        );
        setProducts(productsByCategory);
      }
      setIsActiveCategory(true);
    },
    [items]
  );

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
      thumbnail: "https://picsum.photos/200",
    };
    addItem(newProduct);
    setProducts(items);
  };

  const onDeleteProductHandler = (activeProduct: Product) => {
    setActiveProduct(activeProduct);
  };

  useEffect(() => {
    if (isCategoryList) {
      getCategories();
      selectProductsByCategoryHandler(activeCategory);
    }
    if (isTopList) {
      getToplist(false);
    }
  }, [
    isCategoryList,
    activeCategory,
    isTopList,
    getCategories,
    getToplist,
    selectProductsByCategoryHandler,
  ]);

  return (
    <Fragment>
      <Navigation
        onGetAllProducts={getProductsHandler}
        onGetAllCategories={getCategoriesHandler}
        onGetTopList={getTopListHandler}
      />
      <section className="main">
        <Fragment>
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
        </Fragment>
        <section className="content">
          {(activeProduct && isProductList && !isCategoryList) ||
          (activeProduct && isTopList && !isCategoryList) ? (
            <Fragment>
              <ProductAddDialog submitAction={addNewProductHandler} />
              <ProductItem
                products={products}
                product={activeProduct}
                onDeleteProduct={onDeleteProductHandler}
                onUpdateProduct={selectProductHandler}
              />
            </Fragment>
          ) : (
            ""
          )}
          {isActiveCategory && (
            <ProductAsListItem
              products={products}
              activeCategory={activeCategory}
              onDeleteProduct={onDeleteProductHandler}
              onUpdateProduct={selectProductHandler}
            />
          )}
        </section>
      </section>
    </Fragment>
  );
}

export default Main;
