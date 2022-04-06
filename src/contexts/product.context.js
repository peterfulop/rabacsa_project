import { createContext, useReducer } from "react";
import productsJson from "../data/products.json";

const defaultProductsState = {
  items: [...productsJson.products],
};

const ProductContext = createContext({
  items: [],
  addItem: (product) => {},
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

  const removeItemHandler = (id) => {
    dispatchProductsAction({
      type: "REMOVE",
      id: id,
    });
  };

  const productContext = {
    items: productsState.items,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
