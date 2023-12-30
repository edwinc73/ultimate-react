import { useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import "./App.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "../src/assets/user001.png",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "../src/assets/user002.png",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "../src/assets/user003.png",
    balance: 0,
  },
];

function App() {
  const [curFriend, setCurFriend] = useState();
  const [friends, setFriends] = useState(initialFriends);

  return (
    <div className="app">
      <SideMenu
        setCurFriend={setCurFriend}
        friends={friends}
        setFriends={setFriends}
        curFriend={curFriend}
      />
      {curFriend && (
        <Form
          curFriend={curFriend}
          setCurFriend={setCurFriend}
          setFriends={setFriends}
        />
      )}
    </div>
  );
}

function SideMenu({ setCurFriend, friends, setFriends, curFriend }) {
  SideMenu.propTypes = {
    setCurFriend: PropTypes.func.isRequired,
    friends: PropTypes.array.isRequired,
  };
  const [formMenu, setFormMenu] = useState(false);

  return (
    <div className="sidebar">
      <ul className="friends">
        {friends.map((friend) => {
          return (
            <Friend
              item={friend}
              key={friend.id}
              setCurFriend={setCurFriend}
              curFriend={curFriend}
            />
          );
        })}
      </ul>
      {formMenu && <NewFriendForm setFriends={setFriends} />}
      <button
        className="button"
        onClick={() => {
          setFormMenu((prev) => !prev);
        }}
      >
        {formMenu ? "Close form" : "Add a friend"}
      </button>
    </div>
  );
}

function Friend({ item, setCurFriend, curFriend }) {
  const isSelected = item == curFriend;

  Friend.propTypes = {
    item: PropTypes.object,
  };
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={item.image} alt="" />
      <h3>{item.name}</h3>
      {item.balance == 0 && <p>You and {item.name} are even</p>}
      {item.balance > 0 && (
        <p className="green">
          {item.name} owes you ${item.balance}
        </p>
      )}
      {item.balance < 0 && (
        <p className="red">
          You owe {item.name} ${item.balance * -1}
        </p>
      )}
      <button
        className="button"
        onClick={() => {
          setCurFriend(isSelected ? null : item);
        }}
      >
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function NewFriendForm({ setFriends }) {
  const [name, setName] = useState("");
  const [imageURL, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const friend = {
      id: nanoid(),
      name,
      imageURL,
      balance: 0,
    };
    setFriends((prev) => [...prev, friend]);
    clear();
  };

  const clear = () => {
    setName("");
    setImageUrl("");
  };

  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>👫 Friend</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>🌄 Image URL</label>
        <input
          type="text"
          placeholder="Profile picture"
          value={imageURL}
          required
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />
        <button className="button">Add</button>
      </form>
    </>
  );
}

function Form({ curFriend, setCurFriend, setFriends }) {
  const [expense, setExpense] = useState();
  const [bill, setBill] = useState();
  const [userPay, setUserPay] = useState(true);
  const friendExpense = bill - expense;
  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedbalance =
      userPay == "true"
        ? curFriend.balance + friendExpense
        : curFriend.balance - expense;

    setFriends((prev) => {
      const index = prev.indexOf(curFriend);
      prev.slice();
      prev.splice(index, 1, {
        ...curFriend,
        balance: updatedbalance,
      });
      console.log(prev);
      return prev;
    });
    clear();
  };

  const clear = () => {
    setExpense();
    setBill();
    setCurFriend();
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with anthony</h2>
      <label>💰 Bill value:</label>
      <input
        type="text"
        value={bill}
        required
        onChange={(e) => {
          setBill(Number(e.target.value));
        }}
      />
      <label>🧍‍♀️ Your expense:</label>
      <input
        type="text"
        value={expense}
        required
        onChange={(e) => {
          setExpense(Number(e.target.value));
        }}
      />

      <label>👫 {curFriend.name}'s expense:</label>
      <input type="text" disabled value={bill - expense || ""} />

      <label>🤑 Who is paying the bill?</label>
      <select
        name="payee"
        id="payee"
        onChange={(e) => {
          setUserPay(e.target.value);
        }}
      >
        <option value={true}>You</option>
        <option value={false}>{curFriend.name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}

export default App;
