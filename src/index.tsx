import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductContextProvider } from "./contexts/product.context";

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container as HTMLElement);

root.render(
  <ProductContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductContextProvider>
);
