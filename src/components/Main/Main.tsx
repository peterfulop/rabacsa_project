import {
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

import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**MUI */
import Grid from "@mui/material/Grid";
import ProductAsListItem from "../Product/ProductAsListItem";
import ProductAddDialog from "../Product/actions/ProductAddDialog";
import { v4 as uuidv4 } from "uuid";
import { ProductContext } from "../../contexts/product.context";

function Main() {
  const { items, addItem } = useContext(ProductContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isProductList, setIsProductList] = useState<boolean>(true);
  const [isCategoryList, setIsCategoryList] = useState<boolean>(false);
  const [isTopList, setIsTopList] = useState<boolean>(false);
  const [isActiveCategory, setIsActiveCategory] = useState<boolean>(false);

  const [location, setLocation] = useState<string>("Products");
  const [activeProduct, setActiveProduct] = useState<Product | null>(items[0]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    setProducts(items);
  }, [items]);

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
    <Container fluid>
      <Row>
        <Navigation
          onGetAllProducts={getProductsHandler}
          onGetAllCategories={getCategoriesHandler}
          onGetTopList={getTopListHandler}
        />
      </Row>
      <Row>
        <Col sm={3} className="p-0">
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
        </Col>
        <Col sm={9} className="p-3">
          {(activeProduct && isProductList && !isCategoryList) ||
          (activeProduct && isTopList && !isCategoryList) ? (
            // <section className="content">
            <Row>
              <ProductAddDialog submitAction={addNewProductHandler} />
              <ProductItem
                products={products}
                product={activeProduct}
                onDeleteProduct={onDeleteProductHandler}
                onUpdateProduct={selectProductHandler}
              />
            </Row>
          ) : (
            // </section>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
