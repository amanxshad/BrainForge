import React, { useState } from 'react';

const Item = ({ content, ques, style }) => {
  const options = ['A', 'B', 'C', 'D']; // Replace with your list of options
  const [selectedOption, setSelectedOption] = useState(); // Initial selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="item" style={style}>
      <h1>{content}</h1>
      <div>
        <h3>{ques}</h3>
        {options.map((option) => (
          <div key={option}>
            <input
              type="radio"
              id={`${content}-${option}`} // Unique id based on content prop
              name={`${content}-options`} // Unique name based on content prop
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
