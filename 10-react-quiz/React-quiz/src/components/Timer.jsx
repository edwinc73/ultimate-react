function Timer({ remainingSeconds }) {
  const seconds = (remainingSeconds % 60).toFixed(0);
  const minutes = (remainingSeconds / 60).toFixed(0);
  const formattedTime = `${minutes < 10 ? "0" + minutes : minutes} : ${
    seconds < 10 ? "0" + seconds : seconds
  }`;
  console.log(formattedTime);
  return <div className="timer">{formattedTime}</div>;
}

export default Timer;
