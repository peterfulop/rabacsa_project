import "./App.css";
import Main from "./components/Main/Main";
import ProductContextProvider from "./contexts/product.context";

function App() {
  return (
    <ProductContextProvider>
      <Main />
    </ProductContextProvider>
  );
}

export default App;
