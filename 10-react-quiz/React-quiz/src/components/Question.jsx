import Options from "./Options";

function Question({ data, dispatch, answer }) {
  return (
    <div className="question">
      <h3>{data?.question}</h3>
      <Options data={data} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
