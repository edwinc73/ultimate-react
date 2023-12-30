import { useState } from "react";

function Options({ data, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {data.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index == answer ? "answer" : ""} ${
            hasAnswered
              ? index == data.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
