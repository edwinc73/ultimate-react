import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

function App() {
  const [bill, setBill] = useState("");
  const [rating, setRating] = useState(0);
  const [friendRating, setFriendRating] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("£");

  const percentage = (num) => {
    return (100 + num) / 100;
  };

  const calculateTip = Math.floor(
    bill * percentage(rating) - bill + (bill * percentage(friendRating) - bill)
  );

  const reset = () => {
    setRating(0);
    setFriendRating(0);
    setBill();
  };

  const currencyList = [
    { name: "GBP", value: "£" },
    { name: "USD", value: "$" },
    { name: "EUR", value: "€" },
    { name: "JPY", value: "¥" },
    { name: "CAD", value: "$" },
    { name: "AUD", value: "$" },
    { name: "CNY", value: "¥" },
  ];

  return (
    <>
      <div className="wrapper">
        <Currency
          currencyList={currencyList}
          currency={selectedCurrency}
          onCurrencyChange={setSelectedCurrency}
        />
        <div className="inputs">
          <BillInput bill={bill} onSetBill={setBill} />
          <SelectPercentage percentage={rating} setPercentage={setRating}>
            How did you like the service?
          </SelectPercentage>
          <SelectPercentage
            percentage={friendRating}
            setPercentage={setFriendRating}
          >
            How did your friend like the service?
          </SelectPercentage>
        </div>
        {bill != 0 ? (
          <Output
            tip={calculateTip}
            bill={bill}
            onReset={reset}
            currency={selectedCurrency}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

function Currency({ currencyList, currency, onCurrencyChange }) {
  Currency.propTypes = {
    currency: PropTypes.string.isRequired,
    onCurrencyChange: PropTypes.func.isRequired,
    currencyList: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  return (
    <select
      name="currency"
      id="currency"
      onChange={(e) => {
        console.log(e.target.value);
        onCurrencyChange(e.target.value);
      }}
      value={currency}
    >
      {currencyList.map((item, index) => {
        return (
          <option value={item.value} key={item.name + index}>
            {item.name} ({item.value})
          </option>
        );
      })}
    </select>
  );
}

function BillInput({ bill, onSetBill }) {
  BillInput.propTypes = {
    bill: PropTypes.number,
    onSetBill: PropTypes.func,
  };
  return (
    <div className="question">
      <label>How much was the bill?</label>
      <input
        type="text"
        value={bill}
        placeholder="Bill value"
        onChange={(e) => {
          const value = e.target.value;
          onSetBill(parseInt(value) ? parseInt(value) : 0);
        }}
      />
    </div>
  );
}

function SelectPercentage({ percentage, setPercentage, children }) {
  SelectPercentage.propTypes = {
    percentage: PropTypes.number,
    setPercentage: PropTypes.func,
    children: PropTypes.string,
  };
  return (
    <div className="question">
      <label>{children}</label>
      <select
        name="rating"
        id="rating"
        value={percentage}
        onChange={(e) => {
          setPercentage(parseInt(e.target.value));
        }}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ tip, bill, onReset, currency }) {
  Output.propTypes = {
    tip: PropTypes.number.isRequired,
    bill: PropTypes.number.isRequired,
    onReset: PropTypes.func.isRequired,
    currency: PropTypes.object.isRequired,
  };
  return (
    <>
      <div className="output">
        <strong>
          You pay {currency}
          {tip + bill} ({currency}
          {bill} + {currency}
          {tip} tip)
        </strong>
        <button onClick={onReset}>Reset</button>
      </div>
    </>
  );
}

export default App;
