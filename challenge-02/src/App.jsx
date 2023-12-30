import { useState } from "react";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const reset = () => {
    setCount(0);
    setStep(1);
  };

  const incrementCount = () => {
    setCount((prev) => prev + step);
  };

  const decrementCount = () => {
    setCount((prev) => prev - step);
  };

  return (
    <div className="container">
      <div className="input-container">
        <span>
          <input
            type="range"
            id="step"
            name="step"
            min="1"
            max="20"
            value={step}
            onChange={(e) => {
              setStep(e.target.value);
            }}
          />
        </span>
        <p>Step: {step}</p>
      </div>
      <div className="input-container">
        <button onClick={decrementCount}>-</button>
        <input
          type="number"
          placeholder="Enter count"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
        />
        <button onClick={incrementCount}>+</button>
      </div>
      <Result count={count} />
      {(count !== 0 || step !== 1) && <button onClick={reset}>Reset</button>}
    </div>
  );
}

function Result({ count }) {
  const date = new Date();
  let displayDate = new Date();
  displayDate.setDate(date.getDate() + count);
  displayDate = displayDate.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const resultText = () => {
    if (count == 0) return;

    return count > 0
      ? `${count} ${Math.abs(count) > 1 ? "days" : "day"} from today is `
      : `${count} ${Math.abs(count) > 1 ? "days" : "day"} day ago today is `;
  };

  const displayText = resultText();
  return (
    <div className="result">
      {displayText}
      {displayDate}
    </div>
  );
}
