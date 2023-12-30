import { useEffect, useReducer, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import PointsCounter from "./components/PointsCounter";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const api = "http://localhost:8000/questions";

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  status: "loading",
  points: 0,
  highScore: 0,
  remainingSeconds: 10,
};

function reducer(state, action) {
  const question = state.questions[state.index];

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "start",
      };
    case "newAnswer":
      const correctAnswer = action.payload == question.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: correctAnswer ? state.points + question.points : state.points,
        highScore: correctAnswer
          ? state.points + question.points > state.highScore
            ? state.points + question.points
            : state.highScore
          : state.points > state.highScore
          ? state.points
          : state.highScore,
      };
    case "nextQuestion":
      return state.index == 14
        ? {
            ...state,
            index: state.index + 1,
            answer: null,
            status: "finish",
          }
        : { ...state, index: state.index + 1, answer: null };
    case "reset":
      return {
        ...state,
        index: 0,
        answer: null,
        status: "ready",
        points: 0,
      };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds == 0 ? "finish" : state.status,
      };
    case "gameOver":
      return {
        ...state,
        status: "finish",
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (prev, item) => prev + item.points,
    0
  );

  useEffect(function () {
    fetch(api)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => {
        console.log(err);
        dispatch({ type: "dataFailed" });
      });
  }, []);

  useEffect(() => {
    if (status == "start") {
      const remainingTimer = setInterval(
        () => dispatch({ type: "tick" }),
        1000
      );

      return () => clearInterval(remainingTimer);
    }
  }, [status]);

  return (
    <>
      <Header />
      <Main>
        {status == "loading" && <Loader />}
        {status == "error" && <Error />}
        {status == "ready" && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status == "start" && (
          <>
            <PointsCounter
              points={points}
              numQuestions={questions.length}
              index={index}
              answer={answer}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              data={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <NextButton dispatch={dispatch} answer={answer} />
              <Timer remainingSeconds={remainingSeconds} />
            </Footer>
          </>
        )}

        {status == "finish" && (
          <FinishScreen
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </Main>
    </>
  );
}

export default App;
