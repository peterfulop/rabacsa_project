import DropDownButton from "../UI/DropDownButton";
import "../../Styles/Navigation/Navigation.css";

export default function Navigation(props: {
  onGetAllProducts: Function;
  onGetAllCategories: Function;
  onGetTopList: Function;
}) {
  return (
    <section className="navigation">
      <h1>Rabacsa Project</h1>
      <div>
        <DropDownButton
          buttonTitle={"Menu"}
          onGetProducts={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            props.onGetAllProducts(e)
          }
          onGetCategories={(
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
          ) => props.onGetAllCategories(e)}
          onGetTopList={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            props.onGetTopList(e)
          }
        />
      </div>
    </section>
  );
}
