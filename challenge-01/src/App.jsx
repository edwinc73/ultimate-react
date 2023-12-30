import "./App.css";
import Tag from "./Tag";

function Skills() {
  const skills = [
    { name: "Web development", colour: "blue" },
    { name: "React", colour: "yellow" },
    { name: "HTML + CSS", colour: "green" },
    { name: "Git", colour: "red" },
    { name: "UX + UI", colour: "pink" },
  ];

  return skills.map((item) => {
    return <Tag content={item.name} colour={item.colour} key={item} />;
  });
}

function App() {
  return (
    <>
      <div className="card">
        <img
          src="../public/user.jpg"
          alt="Edwin Cheng profile picture"
          className="avatar"
        />
        <div className="data">
          <h1>Edwin Cheng</h1>
          <p>
            Junior frontend developer with expertise in React and WeChat
            mini-app development. I have a strong passion for creating cool and
            interactive user experience.
          </p>
          <div className="skill-list">
            <Skills />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
