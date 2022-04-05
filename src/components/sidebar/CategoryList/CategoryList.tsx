import { Category } from "../../../interfaces/product.interface";

export default function CategoryList(props: {
  categories: Category[];
  location: string;
}) {
  console.log(props.categories);

  return (
    <section>
      <p className="location-heading">{props.location}</p>
    </section>
  );
}
