import "./Styles/App.css";
import { ProductContextProvider } from "./contexts/product.context";
import { Routes, Route, Navigate, Link } from "react-router-dom";

function App() {
  return (
    <ProductContextProvider>
      <Routes>
        <Route path={"/"} element={} />
        <Route path={"/products"} element={} />
        <Route path={"/categories"} element={} />
        <Route path={"/toplist"} element={} />
        <Route path={"/new-product"} element={} />
        <Route path={"*"} element={} />
      </Routes>
    </ProductContextProvider>
  );
}

export default App;
