import { createContext, useReducer } from "react";
import productsJson from "../data/products.json";
import { Product } from "../utils/interfaces/product.interface";

type ProductContextProviderProps = {
  children: React.ReactNode;
};

const defaultProductsState = {
  items: [...productsJson.products],
};

const productReducer = (state: any, action: any) => {
  if (action.type === "ADD") {
    let updatedItems = [...state.items];
    updatedItems = state.items.concat(action.item);
    return {
      items: updatedItems,
    };
  }
  if (action.type === "UPDATE") {
    const existingItemIndex = state.items.findIndex(
      (item: Product) => item.id === action.item.id
    );
    const existingItem = state.items.find(
      (item: Product) => item.id === action.item.id
    );
    let updatedItems;

    const updatedItem = {
      ...existingItem,
      title: action.item.title,
      price: action.item.price,
      description: action.item.description,
    };

    updatedItems = [...state.items];
    updatedItems[existingItemIndex] = updatedItem;
    return {
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE") {
    let updatedItems;
    updatedItems = [...state.items].filter((item) => item.id !== action.id);
    return {
      items: updatedItems,
    };
  }
};

export const ProductContext = createContext({
  items: [],
  addItem: (product: Product) => {},
  updateItem: (product: Product) => {},
  removeItem: (id: string) => {},
});

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const [productsState, dispatchProductsAction] = useReducer(
    productReducer,
    defaultProductsState
  );

  const addItemHandler = (item: Product) => {
    dispatchProductsAction({
      type: "ADD",
      item: item,
    });
  };

  const updateItemHandler = (item: Product) => {
    dispatchProductsAction({
      type: "UPDATE",
      item: item,
    });
  };

  const removeItemHandler = (id: string) => {
    dispatchProductsAction({
      type: "REMOVE",
      id: id,
    });
  };

  const productContext = {
    items: productsState?.items as never,
    addItem: addItemHandler,
    updateItem: updateItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
};
