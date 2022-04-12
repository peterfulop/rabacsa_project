import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container as HTMLElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
