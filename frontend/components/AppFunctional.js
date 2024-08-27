import React, { useState } from 'react';


const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);

  function getXY() {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return [x, y];
  }

  function getXYMessage() {
    const [x, y] = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setIndex(initialIndex);
    setSteps(initialSteps);
  }

  function getNextIndex(direction) {
    const moves = {
      left: index % 3 !== 0 ? index - 1 : index,
      right: index % 3 !== 2 ? index + 1 : index,
      up: index >= 3 ? index - 3 : index,
      down: index <= 5 ? index + 3 : index,
    };
    return moves[direction];
  }

  function move(evt) {
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);
    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
    } else {
      setMessage("You can't go that way");
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const [x, y] = getXY();
    const payload = {
      x,
      y,
      steps,
      email,
    };
    fetch('http://localhost:9000/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setEmail(initialEmail);
      })
      .catch((err) => {
        setMessage('Error: ' + err.message);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
