import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuizSetup.module.css';

function QuizSetup({ setQuizSettings }) {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuizSettings({ topic, difficulty });
    navigate('/quiz');
  };

  return (
    <div className={styles.quizSetupWrapper}> 
      <form className={styles.quizSetup} onSubmit={handleSubmit}>
        <label>
          Topic
          <br></br>
          <input
            type="text"
            placeholder='Enter a topic'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>
        <label>
          Difficulty Level
          <br></br>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
}

export default QuizSetup;

