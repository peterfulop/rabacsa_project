import { useEffect, useContext } from "react";
import { ProductContext } from "../contexts/product.context";
import { getAllProducts } from "../lib/api";

const useProductReloader = () => {
  const ctx = useContext(ProductContext);
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getAllProducts();
      const timeStamp = new Date(Date.now()).toLocaleString();
      console.log("Products reloded at:", timeStamp);
      ctx.setItems(data);
    }, 20000);
    return () => clearInterval(interval);
  }, [ctx]);
};

export default useProductReloader;
