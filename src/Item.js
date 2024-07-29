import React, { useState } from 'react';

const Item = ({ content, ques, options }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="item">
      <h1>{content}</h1>
      <div>
        <h3>{ques}</h3>
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`${content}-${option}`}
              name={`${content}-options`}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`${content}-${option}`}>{option}</label>
          </div>
        ))}
      </div>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
};

export default Item;
