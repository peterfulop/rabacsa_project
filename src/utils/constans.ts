import { NavigationItem } from "./interfaces/product.interface";

export const PRODUCT_PER_PAGE = 10;
export const ALL_PRODUCTS_TITLE = "all-products";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    to: "/new-product",
    title: "Add new",
  },
  {
    to: "/products",
    title: "Products",
  },
  {
    to: "/categories",
    title: "Categories",
  },
  {
    to: "/toplist",
    title: "Toplist",
  },
];
