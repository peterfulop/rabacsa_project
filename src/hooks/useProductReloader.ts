import { useState, useEffect } from "react";
import { Product } from "../utils/interfaces/product.interface";

const useProductReloader = (props: { data: any }) => {
  const [freshData, setFreshData] = useState<Product[]>([]);
  const [timeStamp, setTimeStamp] = useState<Date>(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("useProductReloader...");
      setFreshData(props.data);
      setTimeStamp(new Date(Date.now()));
    }, 20000);
    return () => clearInterval(interval);
  }, [props.data]);

  return { freshData, timeStamp };
};

export default useProductReloader;
