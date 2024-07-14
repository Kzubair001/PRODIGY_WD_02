import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const startStop = () => {
    setRunning(!running);
  };

  const reset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="App">
      <header>
        <h1>StoppyWatch</h1>
      </header>
      <main>
        <div className="stopwatch">
          <div className="time">
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
          </div>
          <div className="buttons">
            <button onClick={startStop} className={running ? 'stop' : 'start'}>{running ? 'Stop' : 'Start'}</button>
            <button onClick={reset}>Reset</button>
            <button onClick={lap} disabled={!running}>Lap</button>
          </div>
          <div className="laps">
            {laps.map((lap, index) => (
              <div key={index}>Lap {index + 1}: {("0" + Math.floor((lap / 60000) % 60)).slice(-2)}:{("0" + Math.floor((lap / 1000) % 60)).slice(-2)}:{("0" + ((lap / 10) % 100)).slice(-2)}</div>
            ))}
          </div>
        </div>
      </main>
      <footer>
        <p>© 2024 StoppyWatch. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
