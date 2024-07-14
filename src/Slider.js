import React, { useState, useEffect } from 'react';
import './Slider.css';
import Item from './Item';
import { useSwipeable } from 'react-swipeable';

const Slider = () => {
  const [active, setActive] = useState(0);
  const items = Array.from({ length: 5 }, (_, i) => `Question ${i + 1}`);
  const questions = ['who?', 'how?', 'why?', 'when?', 'for?'];

  useEffect(() => {
    loadShow();
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [active]);

  const loadShow = () => {
    const sliderItems = document.querySelectorAll('.slider .item');
    let stt = 0;

    sliderItems[active].style.transform = 'none';
    sliderItems[active].style.zIndex = 1;
    sliderItems[active].style.filter = 'none';
    sliderItems[active].style.opacity = 1;

    for (let i = active + 1; i < sliderItems.length; i++) {
      stt++;
      sliderItems[i].style.transform = `translateX(${160 * stt}px) scale(${1 - 0.2 * stt}) perspective(30px) rotateY(-0.5deg)`;
      sliderItems[i].style.zIndex = -stt;
      sliderItems[i].style.filter = 'blur(5px)';
      sliderItems[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
      stt++;
      sliderItems[i].style.transform = `translateX(${-160 * stt}px) scale(${1 - 0.2 * stt}) perspective(30px) rotateY(0.5deg)`;
      sliderItems[i].style.zIndex = -stt;
      sliderItems[i].style.filter = 'blur(5px)';
      sliderItems[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  };

  //function to set next card item active
  const nextSlide = () => {
    setActive((prev) => (prev + 1 < items.length ? prev + 1 : prev));
  };

  //function to set previous card item active
  const prevSlide = () => {
    setActive((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  //function to add event listener on keyUp
  const handleKeyUp = (event) => {
    if (event.key === 'ArrowRight') {
      nextSlide();
    }
    if (event.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  //function to handle swipe event on card items
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide, // Trigger nextSlide on left swipe
    onSwipedRight: prevSlide, // Trigger prevSlide on right swipe
  });

  
  return (
    <div className="slider" {...swipeHandlers}>
      {items.map((item, index) => (
        <Item key={index} content={item} ques={questions[index]}/>
      ))}
      <button id="next" onClick={prevSlide}> &lt; </button>
      <button id="prev" onClick={nextSlide}> &gt; </button>
    </div>
  );
};

export default Slider;