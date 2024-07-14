// src/App.js
import React from 'react';
import Slider from './Slider';
import './App.css';
import logo from '../src/images/BrainForge-logo.png';

function App() {
  return (
    <div className="App">
      <img src={logo} alt='logo' />
      <Slider />
      <div>
        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;
