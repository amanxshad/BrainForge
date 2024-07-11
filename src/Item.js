import React from 'react';

const Item = ({ content, style }) => {
  return (
    <div className="item" style={style}>
      <h1>{content}</h1>
      Lorem ipsum
    </div>
  );
};

export default Item;