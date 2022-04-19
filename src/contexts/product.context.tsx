import { createContext, useReducer } from "react";
import { Product } from "../utils/interfaces/product.interface";

type ProductContextProviderProps = {
  children: React.ReactNode;
};

const defaultProductsState = {
  items: [],
};

const productReducer = (state: any, action: any) => {
  if (action.type === "SET") {
    let newItems = [...action.items];
    return {
      items: newItems,
    };
  }
};

export const ProductContext = createContext({
  items: [],
  setItems: (products: Product[]) => {},
});

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const [productsState, dispatchProductsAction] = useReducer(
    productReducer,
    defaultProductsState
  );

  const setItemsHandler = (items: Product[]) => {
    dispatchProductsAction({
      type: "SET",
      items: items,
    });
  };

  const productContext = {
    items: productsState?.items as never,
    setItems: setItemsHandler,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
};
