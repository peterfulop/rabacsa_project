import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container as HTMLElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
