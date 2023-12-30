export function Item({ item, handleCheck }) {
  return (
    <li key={item.name + item.quantity}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleCheck(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.name}
      </span>
      <button>❌</button>
    </li>
  );
}
