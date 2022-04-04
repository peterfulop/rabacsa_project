export default function SidebarItem(props: { title: string }) {
  return (
    <section>
      <button>{props.title}</button>
    </section>
  );
}
