import React, { useState, useEffect } from "react";

const api_url = `https://api.frankfurter.app/latest?`;

const query_url = ({ from, to, amount }) => {
  return `${api_url}amount=${amount}&from=${from}&to=${to}`;
};

export default function App() {
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const result = (amount * rate).toFixed(2) + " " + toCur || 0;

  const getExchange = async (fromCur, amount, toCur) => {
    try {
      setLoading(true);
      setError("");
      if (toCur == fromCur) {
        setError("Cannot search the same currency");
        throw new Error("Cannot search the same currency");
      }
      fetch(
        query_url({
          from: fromCur,
          to: toCur,
          amount,
        })
      )
        .then((res) => res.json())
        .then((data) => {
          setRate(data.rates[toCur]);
        });
    } catch {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (amount == 0) return;
    getExchange(fromCur, amount, toCur);
  }, [fromCur, toCur]);

  const handleInput = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        inputMode="numeric"
        value={amount}
        onChange={handleInput}
      />
      <select onChange={(e) => setFromCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={(e) => setToCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {loading && (
        <>
          <p>Loading, please wait.</p>
        </>
      )}
      {amount != 0 && !error && !loading && (
        <>
          <p>{result}</p>
        </>
      )}
      {error && (
        <>
          <p>{error}</p>
        </>
      )}
    </div>
  );
}
