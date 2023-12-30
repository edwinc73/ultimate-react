import { useState } from "react";
import PropTypes from "prop-types";

import "./App.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function App() {
  return (
    <>
      <Accordion />
    </>
  );
}

function Accordion() {
  return (
    <>
      <div className="accordion">
        {faqs.map((item, index) => {
          return (
            <div className="accordionItem" key={index}>
              <AccordionItem
                index={index}
                text={item.text}
                title={item.title}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

function AccordionItem({ index, title, text }) {
  AccordionItem.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={isOpen ? "item open" : "item"}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <div className="number">
          {index < 9 ? "0" + (index + 1) : index + 1}
        </div>
        <div className="title">{title}</div>
        {isOpen ? <p className="icon">-</p> : <p className="icon">+</p>}
        {isOpen && <p className="content-box">{text}</p>}
      </div>
    </>
  );
}

export default App;
