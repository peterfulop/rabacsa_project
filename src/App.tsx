import "./Styles/App.css";
import { ProductContextProvider } from "./contexts/product.context";
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";

import NotFound from "./pages/NotFoundPage";

import ProductsDetails from "./components/Product/ProductsDetails";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import ToplistPage from "./pages/ToplistPage";
import NewProductPage from "./pages/NewProductPage";

function App() {
  // const Category = () => {
  //   console.log("render category");

  //   const params = useParams();
  //   const { category } = params;

  //   const filtered = products.filter((prod) => prod.category === category);
  //   console.log(filtered);

  //   return (
  //     <div>
  //       {filtered.map((prod) => (
  //         <div key={prod.id}>
  //           <h3>{prod?.title}</h3>
  //           <h5>{prod?.category}</h5>
  //           <p>{prod?.id}</p>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  // const Toplist = () => {
  //   console.log("render category");

  //   const params = useParams();
  //   const { category } = params;

  //   const filtered = products.filter((prod) => prod.category === category);
  //   console.log(filtered);

  //   return (
  //     <div>
  //       {filtered.map((prod) => (
  //         <div key={prod.id}>
  //           <h3>{prod?.title}</h3>
  //           <h5>{prod?.category}</h5>
  //           <p>{prod?.id}</p>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <MainLayout>
      <Routes>
        <Route path={"/"} element={<Navigate replace to={"/products"} />} />
        <Route path={"/new-product"} element={<NewProductPage />} />
        <Route path={"/products"} element={<ProductsPage />} />
        <Route path={"/products/:productId"} element={<ProductsPage />}>
          <Route path={""} element={<ProductsDetails />} />
        </Route>
        <Route path={"/categories"} element={<CategoriesPage />} />
        <Route path={"/categories/:category"} element={<CategoriesPage />}>
          <Route path={""} element={<CategoriesPage />} />
        </Route>
        <Route path={"/toplist"} element={<ToplistPage />} />
        <Route path={"/toplist/:productId"} element={<ToplistPage />}>
          <Route path={""} element={<ProductsDetails />} />
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
