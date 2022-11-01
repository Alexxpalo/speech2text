import React, { useState } from 'react';
import './App.css';

var word = require('random-words');
var currentWord = word();

const App = () => {
  const msg = new SpeechSynthesisUtterance();
  msg.text = currentWord;
  const [guess, setGuess] = useState('');
  const [box, setBox] = useState('Click to start!');
  const [score, setScore] = useState(0);

  function getWord() {
    setBox(currentWord.length);
    console.log(currentWord);
  }
   
  const handleGuess = event => {
    setGuess(event.target.value);
  }

  const handleClick = event => {
    event.preventDefault();

    if(guess === currentWord){
      currentWord = word();
      setScore(score + 1);
      getWord();
      msg.text = currentWord;
      window.speechSynthesis.speak(msg);
    }  else {
      setScore(score - 1);
      window.speechSynthesis.speak(msg);
    }
  }

  return (
    <div className="App">
      <div id="content">

        <div id="word" onClick={() => {getWord(); window.speechSynthesis.speak(msg);}}>
          <p> {box} </p>
        </div>

        <div id="input">
          <input type="text" id='guess' onChange={handleGuess} value={guess}></input>
        </div>

        <div id="send" onClick={handleClick}><p>Check!</p></div>

        <div id="score"><p>{score}</p></div>
      </div>
    </div>
  );
}

export default App;
