import { Product } from "../../interfaces/product.interface";

export default function ProductItem(props: { product: Product | null }) {
  console.log(props.product);

  return (
    <section>
      <div className="meta-data">
        <p>{props.product?.title}</p>
        <p>{props.product?.brand}</p>
        <p>{props.product?.description}</p>
      </div>
      <div className="item-deatils">minden...</div>
      <div className="actions">
        <div className="main">
          <button>Tétel módosítása</button>
          <button>Tétel törlése</button>
        </div>
        <button>Új tétel</button>
      </div>
    </section>
  );
}
