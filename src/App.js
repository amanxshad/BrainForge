// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../src/images/BrainForge-logo.png';
import QuizSetup from './QuizSetup';
import Slider from './Slider';
import Score from './Score';
import './App.css';


function App() {
  const [quizSettings, setQuizSettings] = useState(null);

  return (
    <Router>
    <Routes>

      <Route path="/quiz" element={
        <div className="App">
          <Slider quizSettings={quizSettings}/>
          <Link to="/score">
            <button>Submit</button>
          </Link>
        </div>
      }/>

      <Route path="/score" element={ <div className='score'> 
        <Link to="/">
        <img src={logo} alt='logo' style={{ bottom:'85px'}}/> 
        </Link>
        <Score/> 
        <Link to="/">
          <button>Retry</button>
        </Link>
        </div> } />

      <Route path="/" element={ <div className='userinput'> 
        <img src={logo} alt='logo' /> 
        <QuizSetup setQuizSettings={setQuizSettings}/> 
        </div>}/>

    </Routes>
    </Router>
  );
}

export default App;
