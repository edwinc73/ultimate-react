import { useState } from "react";
import { Item } from "./Item";

export default function PackingList({ itemList, clearList, setItemList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedList;
  if (sortBy == "input") sortedList = itemList;

  if (sortBy == "description") {
    sortedList = itemList.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy == "packed") {
    sortedList = itemList.slice().sort((a, b) => a.packed - b.packed);
  }

  const handleCheck = (id) => {
    setItemList(() =>
      itemList.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <>
      <div className="list">
        <ul>
          {sortedList.map((item) => {
            return (
              <Item
                item={item}
                handleCheck={handleCheck}
                key={item.name + item.quantity}
              />
            );
          })}
        </ul>
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={clearList}>Clear list</button>
        </div>
      </div>
    </>
  );
}
