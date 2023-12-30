import { useState } from "react";

export default function Form({ itemList, setItemList }) {
  const maxQuantity = 20;
  const QuantityArr = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  const [item, setItem] = useState({
    name: "",
    quantity: 1,
    packed: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.name == "") return;
    item.id = Date.now();
    setItemList([...itemList, item]);
    setItem({
      name: "",
      quantity: 1,
    });
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        name="itemQuantity"
        id="itemQuantity"
        value={item.quantity}
        onChange={(e) => {
          setItem((item) => ({
            ...item,
            quantity: parseInt(e.target.value),
          }));
        }}
      >
        {QuantityArr.map((item) => {
          return (
            <option value={item} key={"quantityValue" + item}>
              {item}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={(e) => {
          setItem((item) => ({
            ...item,
            name: e.target.value,
          }));
        }}
        placeholder="Item..."
      />
      <button>ADD</button>
    </form>
  );
}
