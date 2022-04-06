// import { createContext, useReducer } from "react";
// import productsJson from "../data/products.json";
// import { AddNewProduct, Product } from "../interfaces/product.interface";

// interface ProductContextInterface {
//   items: [];
//   addItem: () => {};
//   removeItem: (id: string) => {};
// }

// const defaultProductsState = {
//   items: productsJson.products.map((product: any) => product as Product),
// };

// const ProductContext = createContext({
//   items: [],
//   addItem: () => {},
//   removeItem: (id: string) => {},
// });

// const productReducer = (state: any, action: string) => {};

// export function ProductContextProvider(props: { children?: React.ReactNode }) {
//   const [productsState, dispatchProductsAction] = useReducer(
//     productReducer,
//     defaultProductsState
//   );

//   const addItemToCartHandler = (item: AddNewProduct) => {
//     dispatchProductsAction({
//       type: "ADD",
//       item: item,
//     });
//   };

//   const removeItemFromCartHandler = (id: string) => {
//     dispatchProductsAction({
//       type: "REMOVE",
//       id: id,
//     });
//   };

//   const productContext = {
//     items: productsState.items,
//     addItem: addItemToCartHandler,
//     removeItem: removeItemFromCartHandler,
//   };

//   return (
//     <ProductContext.Provider value={productContext}>
//       {props.children}
//     </ProductContext.Provider>
//   );
// }

// // const ProductContext = createContext<Product[]>([]);

// // export function ProductContextProvider(props: { children?: React.ReactNode }) {
// //   console.log("ReadData...");

// //   let products: Product[] = productsJson.products.map(
// //     (product: any) => product as Product
// //   );
// //   return (
// //     <ProductContext.Provider value={[...products]}>
// //       {props.children}
// //     </ProductContext.Provider>
// //   );
// // }

// export default ProductContext;
