import React, { useReducer } from "react";
import productsJson from "../data/products.json";
import { Product } from "../utils/interfaces/product.interface";

export interface ProductContextInterface {
  items: any[];
  addItem: (product: Product) => void;
  updateItem: (product: Product) => void;
  removeItem: (id: string) => void;
}

export type ProductContextType = {
  items: any[];
  addItem: (product: Product) => void;
  updateItem: (product: Product) => void;
  removeItem: (id: string) => void;
};

const defaultProductsState = {
  items: [...productsJson.products],
};

export const ProductContext = React.createContext<ProductContextType | null>(
  null
);
// export const ProductContext =
//   React.createContext<ProductContextInterface | null>({
//     items: [],
//     addItem: (product: Product) => {},
//     updateItem: (product: Product) => {},
//     removeItem: (id: string) => {},
//   });

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

const ProductContextProvider: any = (props: { children: any }) => {
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
    items: productsState?.items as Product[],
    addItem: addItemHandler,
    updateItem: updateItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
