import "./App.css";
import Logo from "../src/components/Logo";
import Form from "./components/Form";
import PackingList from "../src/components/PackingList";
import Stats from "../src/components/Stats";
import { useState } from "react";

function App() {
  const [itemList, setItemList] = useState([]);

  const clearList = () => {
    setItemList([]);
  };
  return (
    <>
      <Logo />
      <Form itemList={itemList} setItemList={setItemList} />
      <PackingList
        itemList={itemList}
        clearList={clearList}
        setItemList={setItemList}
      />
      <Stats itemList={itemList} />
    </>
  );
}

export default App;
