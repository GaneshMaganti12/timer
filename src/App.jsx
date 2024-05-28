import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [start, setStart] = useState(true);
  const [stop, setStop] = useState(false);
  const [reset, setReset] = useState(false);

  const intervalRef = useRef(null);

  const handleStart = () => {
    let count = isPause ? sec : 0;
    let minutes = min;
    if (start) {
      intervalRef.current = setInterval(() => {
        if (minutes > 0) {
          if (count === 0) {
            setMin((min) => min - 1);
            minutes -= 1;
            count = 59;
          } else {
            count -= 1;
          }
          setSec(count);
        } else {
          if (count === 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          } else {
            count -= 1;
            setSec(count);
          }
        }
        setStop(true);
        setReset(true);
        setStart(false);
      }, 1000);
    }
  };

  const handleStop = () => {
    if (intervalRef.current && stop) {
      clearInterval(intervalRef.current);
      setIsPause(true);
      setStart(true);
      setStop(false);
    }
  };

  const handleReset = () => {
    if (intervalRef.current && reset) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      setSec(0);
      setMin(0);
      setIsPause(false);
      setStart(true);
      setReset(false);
    }
  };

  const handleIncrease = () => {
    if (min < 59 && !intervalRef.current) {
      setMin((min) => min + 1);
    }
  };

  const handleDecrease = () => {
    if (min > 0 && !intervalRef.current) {
      setMin((min) => min - 1);
    }
  };

  return (
    <div className="timer-container">
      <div className="timer-card">
        <h1 className="title">Timer</h1>
        <h1 className="time">
          {min > 9 ? min : `0${min}`}:{sec > 9 ? sec : `0${sec}`}
        </h1>
        <div className="adjust-buttons-card">
          <button onClick={handleDecrease}>-</button>
          <button onClick={handleIncrease}>+</button>
        </div>
        <div className="buttons-container">
          <button className="start" onClick={handleStart}>
            {isPause ? "Restart" : "Start"}
          </button>
          <button className="stop" onClick={handleStop}>
            Stop
          </button>
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
