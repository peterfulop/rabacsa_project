export default function ProductImageList(props: { images?: string[] }) {
  return (
    <div className="product-image-list">
      {props.images?.map((image) => (
        <img src={image} alt={image} key={image} />
      ))}
    </div>
  );
}
