interface Row {
  name: string;
  data: string | number;
}

export default function ProductDetails(props: { rows: any }) {
  let rows: Row[] = [];
  for (const key in props.rows) {
    if (key !== "images" && key !== "thumbnail") {
      rows.push({ name: key, data: props.rows[key] });
    }
  }

  return (
    <div className="product-details">
      <h5>Product details:</h5>
      <table className="table table-hover table-striped table-bordered">
        <tbody>
          {rows.map((row: Row) => (
            <tr key={row.name}>
              <th className="w-25">{row.name.toUpperCase()}</th>
              <td>{row.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
