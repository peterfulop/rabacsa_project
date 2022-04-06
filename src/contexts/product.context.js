import { createContext, useReducer } from "react";
import productsJson from "../data/products.json";

const defaultProductsState = {
  items: [...productsJson.products],
};

const ProductContext = createContext({
  items: [],
  addItem: (product) => {},
  updateItem: (product) => {},
  removeItem: (id) => {},
});

const productReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedItems = [...state.items];
    updatedItems = state.items.concat(action.item);
    return {
      items: updatedItems,
    };
  }
  if (action.type === "UPDATE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items.find((item) => item.id === action.item.id);
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

export function ProductContextProvider({ children }) {
  const [productsState, dispatchProductsAction] = useReducer(
    productReducer,
    defaultProductsState
  );

  const addItemHandler = (item) => {
    dispatchProductsAction({
      type: "ADD",
      item: item,
    });
  };

  const updateItemHandler = (item) => {
    dispatchProductsAction({
      type: "UPDATE",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    dispatchProductsAction({
      type: "REMOVE",
      id: id,
    });
  };

  const productContext = {
    items: productsState.items,
    addItem: addItemHandler,
    updateItem: updateItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
