import React from 'react';
import styles from './Score.module.css';
import DonutChart from './DonutChart';

const Score = () => {
    return(
        <div className={styles.score}>

            <h1>Your Score</h1>
            <DonutChart/>
            <h2>2/5</h2>
            <h3>Correct Answer: 2</h3>
            <h4>Wrong Answer: 3</h4>

        </div>
    )
}

export default Score;