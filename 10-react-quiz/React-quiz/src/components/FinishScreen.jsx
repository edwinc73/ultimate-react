function FinishScreen({ maxPossiblePoints, points, dispatch, highScore }) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong> {points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      {points >= highScore ? (
        <h3>
          <strong>You set the new high score! ({highScore})</strong>
        </h3>
      ) : highScore <= points + 30 ? (
        <h3>
          <strong>You almost beat the high score! ({highScore})</strong>
        </h3>
      ) : (
        <h3>
          <strong>Almost there! let's review and try again!</strong>
        </h3>
      )}
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Play Again
      </button>
    </>
  );
}

export default FinishScreen;
