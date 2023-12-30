import { useState } from "react";
import questions from "./data/questions";
import "./App.css";

function App() {
  return (
    <>
      <div className="flashcards">
        <Cards />
      </div>
    </>
  );
}

function Cards() {
  return questions.map((item) => {
    return (
      <Card
        question={item.question}
        answer={item.answer}
        key={"card" + item.id}
      />
    );
  });
}

function Card({ question, answer }) {
  const [active, setActive] = useState(false);
  return (
    <div
      className={active ? "selected card" : "card"}
      onClick={() => {
        setActive((prev) => !prev);
      }}
    >
      {active ? answer : question}
    </div>
  );
}

export default App;
